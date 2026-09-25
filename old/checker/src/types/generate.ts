import type { Tail } from '../array/index.js'
import type { AllType } from './all-type.js'
// import type { KeyTypes } from '../object-key'
import type { Any } from './any.js'
import type { Array } from './array.js'
// import type { BigInt } from './big-int.js'
import type { Boolean, False, True } from './boolean.js'
import type { Null } from './null.js'
import type { Number } from './number.js'
import type { ObjectType } from './object.js'
import type { Record } from './record.js'
import type { String } from './string.js'
import type { Symbol } from './symbol.js'
import type { Tuple } from './tuple.js'
import type { Undefined } from './undefined.js'
import type { Union } from './union.js'
import type { Unknown } from './unknown.js'

export type Generate<T extends AllType> = T extends Undefined
	? undefined
	: T extends Null
	? null
	: T extends True
	? true
	: T extends False
	? false
	: T extends Boolean
	? boolean
	: T extends Symbol
	? symbol
	: T extends Any
	? any
	: T extends Unknown
	? unknown
	: T extends Number
	? T['value']
	: T extends String
	? T['value']
	: T extends ObjectType
	? { [K in keyof T['value']]: Generate<T['value'][K]> }
	: T extends Record
	? { [K: string]: Generate<T['value']> }
	: T extends Array
	? Generate<T['value']>[]
	: T extends Tuple
	? Generate._TupleDevice<T['value']>['result']
	: T extends Union
	? Generate._UnionDevice<T['value']>['result']
	: // T extends BigInt ? T['value'] :
	  unknown

export namespace Generate {
	export type _UnionDevice<T extends AllType[]> = T['length'] extends 0
		? { result: never }
		: // @ts-ignore sometimes language service mark this as referencing itself
		  { result: Generate<T[0]> | _UnionDevice<Tail<T>>['result'] }

	export type _TupleDevice<T extends AllType[]> = T['length'] extends 0
		? { result: [] }
		: // @ts-ignore sometimes language service mark this as referencing itself
		  { result: [Generate<T[0]>, ..._TupleDevice<Tail<T>>['result']] }
}
