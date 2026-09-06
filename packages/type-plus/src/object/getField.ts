import type { UnionKeys } from '../union_keys.js'

/**
 * Reads `subject[key]`, tolerating a `null` or `undefined` subject.
 *
 * With a `defaultValue`, that value is returned whenever the lookup produces
 * anything falsy. ⚠️ Two consequences worth knowing: the check is `||`, not a
 * nullish check, so `0`, `''` and `false` stored on the object are replaced by
 * the default; and the overload types the result as the default's own type
 * (`DV`), not `TX[K] | DV`, so a literal default narrows the result to that
 * literal.
 *
 * @example
 * ```ts
 * const o = { a: 1 } as { a: number } | undefined
 *
 * const r = getField(o, 'a') // 1, typed number
 * const r = getField(undefined as typeof o, 'a') // undefined
 *
 * const r = getField(o, 'a', 5) // 1, but typed 5
 * const r = getField({ a: 0 } as { a: number }, 'a', 5) // 5 -- 0 is falsy
 * ```
 */
export function getField<T, TX extends Exclude<T, undefined | null>, K extends UnionKeys<TX>>(subject: T, key: K): TX[K]
export function getField<
	T,
	TX extends Exclude<T, undefined | null>,
	K extends UnionKeys<TX>,
	DV extends Exclude<TX[K], undefined>,
>(subject: T, key: K, defaultValue: DV): DV
export function getField<
	T,
	TX extends Exclude<T, undefined | null>,
	K extends UnionKeys<TX>,
	DV extends Exclude<TX[K], undefined>,
>(subject: T, key: K, defaultValue?: DV) {
	return (subject && (subject as unknown as { [k in K]: TX[K] | DV })[key]) || defaultValue
}
