import { existsSync } from "node:fs"
import { select, confirm } from "@inquirer/prompts"
import { PackageManager, lockFiles, packageManagers } from "./constants"

export default async function choosePackageManager(): Promise<PackageManager> {
	const pm = findPackageManager()

	if (pm === undefined) {
		return selectPackageManager()
	}

	const usePm = await confirm({ message: `Auto-detected package manager. Use ${pm} for installation?`, default: true })

	if (usePm === false) {
		return selectPackageManager()
	}

	return pm
}

function findPackageManager(): PackageManager | undefined {
	return packageManagers.find((pm) => existsSync(lockFiles[pm]))
}

function selectPackageManager() {
	return select({
		message: 'Select a package manager you would like to use for the install',
		choices: packageManagers.map((pm) => ({
			value: pm
		})),
	});
}