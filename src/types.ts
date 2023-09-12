import type { AVAILABLE_CONFIGS, PACKAGE_MANAGERS } from './constants'

export type AvailableConfig = keyof typeof AVAILABLE_CONFIGS
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export type PackageManagerRecord = Record<PackageManager, string>

export type AvailableConfigEntries = [AvailableConfig, (typeof AVAILABLE_CONFIGS)[AvailableConfig]]
