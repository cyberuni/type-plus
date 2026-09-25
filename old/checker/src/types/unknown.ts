import type { TypeAnalysis, Type } from './types.js'

export type Unknown = Type<'unknown', undefined>

export namespace Unknown {
	export type Analysis = TypeAnalysis<'unknown'>
}

export const unknown: Unknown = { type: 'unknown', value: undefined }
