import type { PackageManagerRecord } from './types'

export const PACKAGE_NAME = '@monogram/eslint-config'

export const ESLINT_FILENAME = '.eslintrc.js'

export const AVAILABLE_CONFIGS = { next: 'Next.js', node: 'Node.js' } as const

export const PACKAGE_MANAGERS = ['yarn', 'pnpm', 'npm'] as const

export const LOCK_FILES: PackageManagerRecord = {
	yarn: `${process.cwd()}/yarn.lock`,
	pnpm: `${process.cwd()}/pnpm-lock.yaml`,
	npm: `${process.cwd()}/package-lock.json`
} as const

export const INSTALL_PREFIXES: PackageManagerRecord = {
	yarn: 'yarn add -D',
	pnpm: 'pnpm add -D',
	npm: 'npm i -D'
} as const
