export const packageManagers = ['yarn', 'pnpm', 'npm'] as const

export type PackageManagers = typeof packageManagers
export type PackageManager = typeof packageManagers[number]

export const installPrefixes = {
	yarn: 'yarn add -D',
	pnpm: 'pnpm i -D',
	npm: 'npm i -D'
} as const
