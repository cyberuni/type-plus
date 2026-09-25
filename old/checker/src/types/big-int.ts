// istanbul ignore file
// import { undef, Undefined } from './undefined.js'
// import { Union, union } from './union.js'

import type { TypeAnalysis, Type } from './types.js'

export type BigInt<Value extends bigint = bigint> = Type<'bigint', Value>

export namespace BigInt {
	export type Analysis = TypeAnalysis<'bigint', bigint>
}

/**
 * Creates a single value type.
 */
function create<Value extends bigint>(value: Value): BigInt<Value> {
	// Cannot name this function as `const` because it is a reserved keyword.
	return { type: 'bigint', value }
}

const any = create(undefined as unknown as bigint)

export const bigint = Object.assign(any, {
	any,
	create
	// Note: adding this requires Union type to include BigInt
	// optional: {
	//   ...union.create(any, undef),
	//   /**
	//    * Creates an optional bigint constant type.
	//    */
	//   create<Value extends bigint>(value: Value): Union<[BigInt<Value>, Undefined]> {
	//     return union.create(create(value), undef)
	//   }
	// }
})
