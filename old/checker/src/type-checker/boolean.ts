import type { Type, TypeSpec } from './types.js'

export type Boolean<Value extends boolean = boolean> = Type<'boolean', Value>
export namespace Boolean {
	export type Analysis = { type: 'boolean'; value?: boolean; fail?: true }
}

export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends boolean>(value: Value): Boolean<Value> {
	return { type: 'boolean', value }
}

const any = create(undefined as unknown as boolean)

// export const booleanSpec: TypeSpec<'boolean', boolean, boolean> = {
//   type: any,
//   toAnalysis: <Type extends Boolean>({ type, value }: Type) => ({ type, value }),
//   toNative: <Value extends boolean>(value: Value) => value
// }

export const BooleanSpec: TypeSpec<Type<'boolean', boolean>> = {
	type: any,
	toAnalysis(_options, value, actual) {
		if (value === undefined) {
			return typeof actual === 'boolean' ? { type: 'boolean', value } : { type: 'boolean', value, fail: true }
		} else {
			return value === actual ? { type: 'boolean', value } : { type: 'boolean', value, fail: true }
		}
	},
	toNative(value: any): true {
		return value
	}
}
