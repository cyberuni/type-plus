import { Type } from './types.js'
import { undef, Undefined } from './undefined.js'
import { Union, union } from './union.js'

export type Boolean<Value extends boolean = boolean> = Type<'boolean', Value>
export namespace Boolean {
	export type Analysis = { type: 'boolean'; value?: boolean; fail?: true }
}

export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends boolean>(value: Value): Boolean<Value> {
	return { type: 'boolean', value }
}

const any = create(undefined as unknown as boolean)
const t = create(true)
const f = create(false)

export const boolean = Object.assign(any, {
	any,
	true: t,
	false: f,
	create,
	optional: Object.assign(union.create(any, undef), {
		/**
		 * Creates an optional boolean type.
		 */
		create<Value extends boolean>(value: Value): Union<[Boolean<Value>, Undefined]> {
			return union.create(create(value), undef)
		},
		true: union.create(t, undef),
		false: union.create(f, undef)
	})
})
