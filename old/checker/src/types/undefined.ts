import type { TypeAnalysis, Type } from './types.js'

export type Undefined = Type<'undefined', undefined>
export namespace Undefined {
	export type Analysis = TypeAnalysis<'undefined'>
}

export const undef: Undefined = { type: 'undefined', value: undefined }
