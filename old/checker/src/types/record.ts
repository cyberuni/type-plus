import type { AllType } from './all-type.js'
import type { TypeAnalysis, Type } from './types.js'
import { undef, Undefined } from './undefined.js'
import { union, Union } from './union.js'

export type Record<Value extends AllType = any> = Type<'record', Value>

export namespace Record {
	export type Analysis<Value extends AllType.PrimitiveValues | AllType.Analysis = any> = TypeAnalysis<
		'record',
		Value
	>
}

function create<Value extends AllType>(value: Value): Record<Value> {
	return { type: 'record', value }
}

export const record = {
	create,
	optional: {
		create<Value extends AllType>(value: Value): Union<[Record<Value>, Undefined]> {
			return union.create(create(value), undef) as any
		}
	}
}
