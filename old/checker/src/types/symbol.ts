import type { TypeAnalysis, Type } from './types.js'
import { undef } from './undefined.js'
import { union } from './union.js'

export type Symbol<Value extends string = string> = Type<'symbol', Value>

export namespace Symbol {
	export type Analysis = TypeAnalysis<'symbol'>
}

function create<Value extends string>(value: Value): Symbol<Value> {
	return { type: 'symbol', value }
}

const any = create(undefined as unknown as string)

export const symbol = Object.assign(any, {
	optional: union.create(any, undef)
})
