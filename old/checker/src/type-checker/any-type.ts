import { TypeAnalysis, Type, TypeSpec } from './types.js'

export type Any = Type<'any', undefined>
export namespace Any {
	export type Analysis = TypeAnalysis<'any'>
}
export const any: Any = { type: 'any', value: undefined }

export const anySpec: TypeSpec<Any> = {
	type: any,
	toAnalysis: (options, value, _subject) => ({ type: 'any', value }),
	toNative: value => value
}
