import nextJsConfig from './nextjs'
import nodeConfig from './node'

export const configs = {
	nextjs: {
		config: nextJsConfig,
		dependencies: [
			'eslint',
			'eslint-config-next',
			'eslint-config-prettier',
			'eslint-config-airbnb',
			'eslint-plugin-import',
			'eslint-import-resolver-typescript',
			'@typescript-eslint/eslint-plugin',
			'@typescript-eslint/parser'
		]
	},
	node: {
		config: nodeConfig,
		dependencies: [
			'eslint',
			'eslint-config-prettier',
			'eslint-config-airbnb-base',
			'eslint-plugin-import',
			'eslint-import-resolver-typescript',
			'@typescript-eslint/eslint-plugin',
			'@typescript-eslint/parser'
		]
	}
	// TODO:
	// svelte: { config: {}, dependencies: {} },
	// node: { config: {}, dependencies: {} }
} as const

export const availableConfigs = Object.keys(configs) as Array<keyof typeof configs>

export type AvailableConfigs = typeof availableConfigs
export type AvailableConfig = typeof availableConfigs[number]
