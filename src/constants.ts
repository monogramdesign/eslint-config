export const PACKAGE_NAME = "@monogram/eslint-config"

export const ESLINT_FILENAME = '.eslintrc.js' 

export const availableConfigs = ["next", "node"] as const
export type AvailableConfig = typeof availableConfigs[number]

export const packageManagers = ['yarn', 'pnpm', 'npm'] as const
export type PackageManager = typeof packageManagers[number]

type PackageManagerMap = Record<PackageManager, string>

export const lockFiles: PackageManagerMap = {
	yarn: `${process.cwd()}/yarn.lock`,
	pnpm: `${process.cwd()}/pnpm-lock.yaml`,
	npm: `${process.cwd()}/package-lock.json`
} as const

export const installPrefixes: PackageManagerMap = {
	yarn: 'yarn add -D',
	pnpm: 'pnpm add -D',
	npm: 'npm i -D'
} as const