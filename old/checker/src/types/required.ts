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

export const required = {
	any,
	array: array,
	// bigint: bigint,
	boolean: boolean,
	null: nil,
	number: number,
	object: object,
	record: record,
	string: string,
	symbol: symbol,
	tuple: tuple,
	undefined: undef,
	unknown
}
export const R = required
