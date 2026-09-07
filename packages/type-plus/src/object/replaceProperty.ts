import type { AnyRecord } from './any_record.js'

/**
 * ⚗️ *transform*
 *
 * Replaces the type of property `K` on `T` with `V`.
 *
 * The result is an intersection, and the replaced key moves to the end of the
 * resolved shape.
 *
 * @example
 * ```ts
 * type R = ReplaceProperty<{ a: number; b: string }, 'a', boolean>
 * // Omit<{ a: number; b: string }, 'a'> & { a: boolean }
 * // resolved: { b: string; a: boolean }
 * ```
 */
export type ReplaceProperty<T extends AnyRecord, K extends keyof T, V> = Omit<T, K> & { [P in K]: V }

/**
 * Returns a copy of `subject` with property `key` set to `value`, typed as
 * `ReplaceProperty<T, K, V>`.
 *
 * `subject` is not mutated; the copy is a shallow spread, so nested values are
 * shared.
 *
 * @example
 * ```ts
 * const r = replaceProperty({ a: 1, b: 'x' }, 'a', 'z')
 * // r === { a: 'z', b: 'x' }
 * // typeof r === Omit<{ a: number; b: string }, 'a'> & { a: string }
 * ```
 */
export function replaceProperty<T extends AnyRecord, K extends keyof T, V>(
	subject: T,
	key: K,
	value: V,
): ReplaceProperty<T, K, V> {
	return { ...subject, [key]: value }
}
