import type { Widen } from '../utils/widen.js'
import type { AnyRecord } from './any-record.js'
import type { KeyTypes } from './key-types.js'

/**
 * Creates a `Record<Key, Value>` or your custom record.
 * By default,
 * `record()` will widen the keys (`K`) you specified in the `value` to form `Record<Widen<K>, V>`.
 *
 * You can also override it by specifying a custom record, e.g.:
 * `record<{ a: number }>()`
 */
export function record<K extends KeyTypes, V>(value?: Record<K, V>): Record<Widen<K>, V>
export function record<R extends Record<any, any>>(value?: R): R
export function record(value?: any) {
	const r = Object.create(null) as AnyRecord
	return (value ? Object.assign(r, value) : r) as AnyRecord
}

/**
 * Gets the value type `T` from `Record<any, T>`.
 */
export type RecordValue<R extends Record<any, any>> = R extends Record<any, infer T> ? T : never
