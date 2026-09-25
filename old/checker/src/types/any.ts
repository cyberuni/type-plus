import { Type, TypeAnalysis } from './types.js'

export type Any = Type<'any', undefined>
export namespace Any {
	export type Analysis = TypeAnalysis<'any'>
}
export const any: Any = { type: 'any', value: undefined }
