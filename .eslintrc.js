module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	rules: {
		indent: 'off',
		'no-use-before-define': 'off',
		'no-else-return': [
			'error',
			{
				allowElseIf: true
			}
		],
		'import/extensions': 'off'
	}
}
