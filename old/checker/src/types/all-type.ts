import type { Any } from './any.js'
import type { Array } from './array.js'
// import { BigInt } from './big-int.js'
import type { Boolean } from './boolean.js'
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

export type AllType =
	| Undefined
	| Null
	| Boolean
	| Number
	| String
	| ObjectType
	| Record
	| Array
	| Tuple
	// <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
	| Union // | Intersection | SubSet | SuperSet | Complement | Diff
	| Unknown
	| Any
	| Symbol // | BigInt

export namespace AllType {
	export type PrimitiveValues = boolean | number | string // | bigint
	export type Analysis =
		| Any.Analysis
		| Unknown.Analysis
		| Undefined.Analysis
		| Null.Analysis
		| Boolean.Analysis
		| Number.Analysis
		| String.Analysis
		| Symbol.Analysis
		| ObjectType.Analysis
		| Record.Analysis
		| Array.Analysis
		| Tuple.Analysis
		| Union.Analysis
}
