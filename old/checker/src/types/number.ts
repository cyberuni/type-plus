import { Tail } from '../array/index.js'
import { Type } from './types.js'
import { undef, Undefined } from './undefined.js'
import { Union, union } from './union.js'

export type Number<Value extends number = number> = Type<'number', Value>

export namespace Number {
	export type Analysis = {
		type: 'number'
		value?: number
		fail?: true
	}
}

type NumberListDevice<Values extends number[] = number[]> = Values['length'] extends 0
	? { result: [] }
	: Values['length'] extends 1
	? { result: [Number<Values[0]>] }
	: { result: [Number<Values[0]>, Number<Values[1]>, ...NumberListDevice<Tail<Tail<Values>>>['result']] }

/**
 * Creates a single number type.
 */
function create<Value extends number>(value: Value): Number<Value> {
	return { type: 'number', value }
}

const any = create(undefined as unknown as number)

export const number = Object.assign(any, {
	any,
	create,
	// @ts-ignore we know that this can be infinite
	list<Value extends number, Values extends number[]>(
		value: Value,
		...values: Values
	): Union<
		// @ts-ignore this seems to be a bug in TypeScript.
		// It can recognize `NumberListDevice<[1,2,3]>['result']`
		NumberListDevice<[Value, ...Values]>['result']
	> {
		return union.create(create(value), ...values.map(create)) as any
	},
	optional: Object.assign(union.create(any, undef), {
		/**
		 * Creates an optional number constant type.
		 */
		create<Value extends number>(value: Value): Union<[Number<Value>, Undefined]> {
			return union.create(create(value), undef)
		},
		// @ts-ignore we know that this can be infinite
		list<Value extends number, Values extends number[]>(
			value: Value,
			...values: Values
		): Union<
			// @ts-ignore this seems to be a bug in TypeScript.
			[...NumberListDevice<[Value, ...Values]>['result'], Undefined]
		> {
			return union.create(create(value), ...values.map(create), undef) as any
		}
	})
})
