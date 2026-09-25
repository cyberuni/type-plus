import type { AllType } from './all-type.js'
import type { TypeAnalysis, Type } from './types.js'
import { undef } from './undefined.js'

export type Union<Values extends AllType[] = any[]> = Type<'union', Values>

export namespace Union {
	export type Analysis<Value extends AllType.PrimitiveValues | AllType.Analysis = any> = TypeAnalysis<
		'union',
		Value[]
	>
}

/**
 * Create union type.
 */
function create<Value extends AllType, Values extends AllType[]>(
	value: Value,
	...values: Values
): Values['length'] extends 0 ? Value : Union<[Value, ...Values]> {
	values.unshift(value)
	if (values.length === 1) return values[0] as any
	const v = values.reduce<AllType[]>((p, v) => {
		if (v.type === 'union') {
			p.push(...(v as any).value)
		} else {
			p.push(v)
		}
		return p
	}, [])
	return { type: 'union', value: v } as any
}

export const union = {
	create,
	optional: {
		/**
		 * Creates an optional unional type.
		 */
		create<Value extends AllType, Values extends AllType[]>(value: Value, ...values: Values) {
			values.push(undef)
			return create(value, ...values)
		}
	}
}
