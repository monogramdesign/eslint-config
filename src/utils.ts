import { createInterface } from 'readline'

export function getReadlineInterface() {
	return createInterface({
		input: process.stdin,
		output: process.stdout
	})
}
