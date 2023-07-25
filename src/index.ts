#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import prompts from 'prompts'

const ESLINT_FILENAME = '.eslintrc.js' 

const availableConfigs = ["next", "node"] as const
type AvailableConfig = typeof availableConfigs[number]

const packageManagers = ['yarn', 'pnpm', 'npm'] as const
type PackageManager = typeof packageManagers[number]

if (existsSync(`${process.cwd()}/${ESLINT_FILENAME}`)) {

	prompts({
		type: 'confirm',
		name: 'yes',
		message: `Do you want to replace the current ${ESLINT_FILENAME} file?`,
	}).then(({yes}: {yes: boolean}) => {
		if (yes) {
			handleCreate()
		}
	})
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
	return prompts({
		type: 'select',
		name: 'config',
		message: "Which ESLint configuration do you want to install?",
		choices: availableConfigs.map((config) => ({
			title: config,
			value: config
		}))
	}).then(({config}) => config)
}

function createESLintConfig(whichConfig: AvailableConfig) {
	const dataAsString = JSON.stringify(
		{
      extends: `@monogram/eslint-config/${whichConfig}`
    },
		null,
		2 
	)

	writeFileSync(`${process.cwd()}/${ESLINT_FILENAME}`, `module.exports = ${dataAsString}`)

	console.log(`✅ ESLint configuration file created at ${process.cwd()}/${ESLINT_FILENAME}`)
}

async function choosePackageManager(): Promise<PackageManager> {
	return prompts({
		type: 'select',
		name: 'packageManager',
		message: "Which ESLint configuration do you want to install?",
		choices: packageManagers.map((pm) => ({
			title: pm,
			value: pm
		})),
		initial: findPackageManager()
	}).then(({packageManager}) => packageManager)
}

const installPrefixes = {
	yarn: 'yarn add -D',
	pnpm: 'pnpm add -D',
	npm: 'npm i -D'
} as const

async function installDependency(packageManager: PackageManager) {
	const installPrefix = installPrefixes[packageManager]

	const installCommand = `${installPrefix} eslint @monogram/eslint-config`

	console.log(`📦 Installing dependencies...`)

  try {
    execSync(installCommand)
  } catch (error) {
    console.error(error)
  }
}

const lockFiles = {
	yarn: `${process.cwd()}/yarn.lock`,
	pnpm: `${process.cwd()}/pnpm-lock.yaml`,
	npm: `${process.cwd()}/package-lock.json`
}

function findPackageManager() {
	const index = packageManagers.findIndex((pm) => existsSync(lockFiles[pm]))
	if (index === -1) return null
	return index
}