#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { select, confirm } from '@inquirer/prompts'

import {
	AVAILABLE_CONFIGS,
	ESLINT_FILENAME,
	PACKAGE_NAME,
	INSTALL_PREFIXES,
	ESLINT_VERSION
} from './constants'
import { choosePackageManager } from './package-manager'

import type { AvailableConfig, AvailableConfigEntries, PackageManager } from './types'

if (existsSync(`${process.cwd()}/${ESLINT_FILENAME}`)) {
	confirm({ message: `Do you want to replace the current ${ESLINT_FILENAME} file?` }).then(
		(yes) => yes && handleCreate()
	)
} else {
	handleCreate()
}

async function handleCreate() {
	const config = await chooseConfig()
	const packageManager = await choosePackageManager()

	await installDependency(packageManager)
	createESLintConfig(config)
}

async function chooseConfig(): Promise<AvailableConfig> {
	return select({
		message: 'Which ESLint configuration do you want to install?',
		choices: Object.entries(AVAILABLE_CONFIGS).map(([value, name]: AvailableConfigEntries) => ({
			value,
			name
		}))
	})
}

async function installDependency(packageManager: PackageManager) {
	const installPrefix = INSTALL_PREFIXES[packageManager]

	const installCommand = `${installPrefix} eslint@${ESLINT_VERSION} ${PACKAGE_NAME}`

	console.log(`📦 Installing dependencies...`)

	try {
		execSync(installCommand, { stdio: 'inherit' })
	} catch (error) {
		console.error(error)
	}
}

function createESLintConfig(whichConfig: AvailableConfig) {
	const dataAsString = JSON.stringify(
		{
			extends: `${PACKAGE_NAME}/${whichConfig}`
		},
		null,
		2
	)

	writeFileSync(`${process.cwd()}/${ESLINT_FILENAME}`, `module.exports = ${dataAsString}`)

	console.log(`✅ ESLint configuration file created at ${process.cwd()}/${ESLINT_FILENAME}`)
}
