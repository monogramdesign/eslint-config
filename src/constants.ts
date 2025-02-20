import type { PackageManagerRecord } from './types'

export const PACKAGE_NAME = '@monogram/eslint-config'
export const ESLINT_VERSION = '^8.0.0'
export const ESLINT_FILENAME = '.eslintrc.js'

export const AVAILABLE_CONFIGS = { next: 'Next.js', node: 'Node.js' } as const

export const PACKAGE_MANAGERS = ['npm', 'yarn', 'pnpm', 'bun'] as const

export const LOCK_FILES: PackageManagerRecord = {
	npm: 'package-lock.json',
	yarn: 'yarn.lock',
	pnpm: 'pnpm-lock.yaml',
	bun: 'bun.lockb'
} as const

export const INSTALL_PREFIXES: PackageManagerRecord = {
	yarn: 'yarn add -D',
	pnpm: 'pnpm add -D',
	npm: 'npm i -D',
	bun: 'bun add -D'
} as const
