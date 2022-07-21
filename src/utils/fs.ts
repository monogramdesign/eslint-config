import { existsSync } from 'fs'

// eslint-disable-next-line import/prefer-default-export
export function fileExists(filePath: string) {
	return existsSync(filePath)
}
