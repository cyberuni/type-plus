import { object } from './object.js'
import { any } from './any.js'
import { array } from './array.js'
import { boolean } from './boolean.js'
import { nil } from './null.js'
import { number } from './number.js'
import { string } from './string.js'
import { symbol } from './symbol.js'
import { tuple } from './tuple.js'
import { undef } from './undefined.js'
import { unknown } from './unknown.js'
import { record } from './record.js'
// import { bigint } from './types/big-int'

export const optional = {
	any,
	array: array.optional,
	// bigint: bigint.optional,
	boolean: boolean.optional,
	null: nil.optional,
	number: number.optional,
	object: object.optional,
	record: record.optional,
	string: string.optional,
	symbol: symbol.optional,
	tuple: tuple.optional,
	undefined: undef,
	unknown
}
export const O = optional
