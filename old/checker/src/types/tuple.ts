import type { TypeAnalysis, Type } from './types.js'
import type { AllType } from './all-type.js'
import { undef, Undefined } from './undefined.js'
import { union, Union } from './union.js'
import type { Tail } from '../array/index.js'

export type Tuple<Values extends AllType[] = any[]> = Type<'tuple', Values>

export namespace Tuple {
	export type Analysis<Value extends AllType.PrimitiveValues | AllType.Analysis = any> = TypeAnalysis<
		'tuple',
		Value[]
	>

	export type FindByProp<Tuple extends Array<{ [K in Key]: any }>, Key extends string, Value> = FindByProp._<
		Tuple,
		Key,
		Value
	>['result']
	export namespace FindByProp {
		export type _<
			Tuple extends Array<{ [K in Key]: any }>,
			Key extends string,
			Value
		> = Tuple['length'] extends 0
			? { result: never }
			: { result: Value extends Tuple[0][Key] ? Tuple[0] : _<Tail<Tuple>, Key, Value>['result'] }
	}
}

/**
 * Creates a tuple type.
 */
function create<Value extends AllType, Values extends AllType[]>(
	value: Value,
	...values: Values
): Tuple<[Value, ...Values]> {
	return {
		type: 'tuple',
		value: [value, ...values]
	}
}
export const tuple = {
	create,
	optional: {
		/**
		 * Creates an optional tuple type.
		 */
		create<Value extends AllType, Values extends AllType[]>(
			value: Value,
			...values: Values
		): Union<[Tuple<[Value, ...Values]>, Undefined]> {
			return union.create(create(value, ...values), undef)
		}
	}
}
