import { KeyTypes, reduceByKey } from '../object/index.js'
import type { AllType } from './all-type.js'
import { number } from './number.js'
import { string as str } from './string.js'
import { symbol as sym } from './symbol.js'
import type { Type } from './types.js'
import { undef, Undefined } from './undefined.js'
import { union, Union } from './union.js'

export type ObjectType<Props extends Record<string, AllType> = Record<string, any>> = Type<'object', Props>

export namespace ObjectType {
	export type Analysis<Value extends AllType.PrimitiveValues | AllType.Analysis = any> = {
		type: 'object'
		value?: Record<string, Value>
		fail?: true
	}
}

/**
 * create specific object type.
 */
function create<Props extends Record<string, AllType>>(props: Props): ObjectType<Props> {
	return { type: 'object', value: props }
}

const any = create(undefined as any)

export function map<T extends Record<KeyTypes, any>>(
	callback: (value: any, key: keyof T, obj: Record<KeyTypes, any>) => any,
	subject: T
) {
	return reduceByKey(subject, (p, k) => ((p[k] = callback(subject[k], k, p)), p), {} as Record<any, any>)
}

export const object = Object.assign(any, {
	any,
	create,
	map,
	optional: Object.assign(union.create(any, undef), {
		/**
		 * Creates an optional object type.
		 */
		create<Props extends Record<string, AllType>>(props: Props): Union<[ObjectType<Props>, Undefined]> {
			return union.create(create(props), undef)
		}
	})
})

export const keys = union.create(str, number, sym)
