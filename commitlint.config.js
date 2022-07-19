module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// allow all cases
		'subject-case': [
			1,
			'always',
			[
				'lower-case', // default
				'upper-case', // UPPERCASE
				'camel-case', // camelCase
				'kebab-case', // kebab-case
				'pascal-case', // PascalCase
				'sentence-case', // Sentence case
				'snake-case', // snake_case
				'start-case' // Start Case
			]
		],
		'body-max-line-length': [2, 'always', 500] // maximum length of body (default is 100)
	}
}
