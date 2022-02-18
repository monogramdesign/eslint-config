#!/usr/bin/env node

import { promisify } from 'util'
import { exec as realExec } from 'child_process'
import { writeFileSync, stat } from 'fs'
import { getReadlineInterface } from './utils'
import { configs, availableConfigs, type AvailableConfig } from './configs'
import { packageManagers, type PackageManager, installPrefixes } from './package-managers'

const exec = promisify(realExec)

const esLintFilename = '.eslintrc'
const projectDir = process.cwd()

handleCreate()

function handleCreate() {
	const rl = getReadlineInterface()
	const configOptions = availableConfigs.join(', ')

	rl.question(`Which ESLint configuration do you want? [${configOptions}] `, (answer) => {
		rl.close()
		chooseConfig(answer.toLowerCase())
	})
}

function chooseConfig(whichConfig: string) {
	if (availableConfigs.includes(whichConfig as AvailableConfig)) {
		stat(`${projectDir}/${esLintFilename}`, (error, stats) => {
			if (stats) {
				const rl = getReadlineInterface()

				rl.question(
					`Do you want to replace the current ${esLintFilename} file? [y,n] `,
					(answer) => {
						rl.close()

						const lowerCaseAnswer = answer.toLowerCase()

						if (lowerCaseAnswer === 'y') {
							configESLint(whichConfig as AvailableConfig)
						} else if (lowerCaseAnswer === 'n') {
							process.exit(0)
						} else {
							console.error('❌ Please insert y or n')
							process.exit(0)
						}
					}
				)
			} else {
				configESLint(whichConfig as AvailableConfig)
			}
		})
	} else {
		console.log(`❌ ${whichConfig} is not available`)
	}
}

async function configESLint(whichConfig: AvailableConfig) {
	createESLintConfig(whichConfig)

	await installDependencies(whichConfig)
}

function createESLintConfig(whichConfig: AvailableConfig) {
	const { config } = configs[whichConfig]

	const dataAsString = JSON.stringify(
		config,
		null,
		2 // TODO : get config from prettier
	)

	writeFileSync(`${projectDir}/.eslintrc`, dataAsString)

	console.log(`\n✅ ESLint configuration file created at ${projectDir}/${esLintFilename}\n`)
}

async function installDependencies(whichConfig: AvailableConfig) {
	const rl = getReadlineInterface()
	const packageManagersOptions = packageManagers.join(', ')

	rl.question(
		`Which package manager should be used? [${packageManagersOptions}] `,
		(whichManager): void => {
			if (packageManagersOptions.includes(whichManager as PackageManager)) {
				rl.close()

				const installPrefix = installPrefixes[whichManager]

				const { dependencies } = configs[whichConfig]
				const dependenciesAsString = dependencies.join(' ')

				const installCommand = `${installPrefix} ${dependenciesAsString}`

				console.log(`\nInstalling dependencies...`)
				console.log(`${installCommand}\n`)

				exec(
					installCommand,
					// @ts-ignore
					(stdout: string, stderr: string) => {
						if (stderr) {
							console.error(stderr)
						} else {
							console.log(stdout)
						}

						Promise.resolve({ stdout, stderr })
					}
				)
			} else {
				console.log(`❌ ${whichConfig} is not available`)
			}
		}
	)
}
