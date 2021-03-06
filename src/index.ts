#!/usr/bin/env node
import { writeFileSync } from 'fs'
import { question, fileExists, exec, ESLINT_FILENAME } from './utils'
import { configs, availableConfigs, type AvailableConfig } from './configs'
import {
	packageManagers,
	type PackageManager,
	installPrefixes,
	findPackageManager
} from './package-managers'

const configFileAlreadyExists = fileExists(`${process.cwd()}/${ESLINT_FILENAME}`)

// check if ESLint file already exists to prevent unwanted overwrites
if (configFileAlreadyExists) {
	question(`\nDo you want to replace the current ${ESLINT_FILENAME} file? \n[y,n] `).then(
		(answer) => {
			const shouldReplaceCurrentConfig = answer?.toLowerCase() === 'y'

			if (shouldReplaceCurrentConfig) {
				handleCreate()
			}
		}
	)
} else {
	handleCreate()
}

async function handleCreate() {
	const config = await chooseConfig()

	if (config) {
		const packageManager = await choosePackageManager()

		if (packageManager) {
			createESLintConfig(config)
			await installDependencies(config, packageManager)
		} else {
			console.log(`❌ Package manager not available`)
		}
	} else {
		console.log(`❌ Configuration not available`)
	}
}

async function chooseConfig(): Promise<AvailableConfig | null> {
	let config: AvailableConfig | null = null

	const configOptions = availableConfigs.join(', ')

	const chosenConfig = await question(
		`\nWhich ESLint configuration do you want to install? \n[${configOptions}] `
	)

	if (availableConfigs.includes(chosenConfig as AvailableConfig)) {
		config = chosenConfig as AvailableConfig
	} else {
		config = chosenConfig as AvailableConfig
	}

	return config
}

function createESLintConfig(whichConfig: AvailableConfig) {
	const { config } = configs[whichConfig]

	const dataAsString = JSON.stringify(
		config,
		null,
		2 // TODO: get config from prettier
	)

	writeFileSync(`${process.cwd()}/${ESLINT_FILENAME}`, `module.exports = ${dataAsString}`)

	console.log(`✅ ESLint configuration file created at ${process.cwd()}/${ESLINT_FILENAME}`)
}

async function choosePackageManager() {
	let packageManager = findPackageManager()

	if (packageManager) {
		console.log(`\n📦 An existing ${packageManager} installation was found`)
	} else {
		const packageManagersOptions = packageManagers.join(', ')

		const chosenManager = await question(
			`Which package manager should be used? \n[${packageManagersOptions}] `
		)

		if (packageManagersOptions.includes(chosenManager as PackageManager)) {
			packageManager = chosenManager as PackageManager
		}
	}

	return packageManager
}

async function installDependencies(config: AvailableConfig, packageManager: PackageManager) {
	const installPrefix = installPrefixes[packageManager]

	const { dependencies } = configs[config]
	const dependenciesAsString = dependencies.join(' ')

	const installCommand = `${installPrefix} ${dependenciesAsString}`

	console.log(`📦 Installing dependencies...`)
	console.log(`${installCommand}\n`)

	await exec(
		installCommand,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
}
