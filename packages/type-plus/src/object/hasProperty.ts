import type { UnionKeys } from '../union_keys.js'

/**
 * A type guard narrowing `value` to `T & Record<P, T[P]>`.
 *
 * ⚠️ Two limits worth knowing before reaching for it to discriminate a union.
 *
 * The runtime check is `!!value[prop]`, i.e. truthiness rather than `in`, so a
 * property that is present but holds `0`, `''`, `null`, `undefined` or `false`
 * fails the guard.
 *
 * And on a union, `T[P]` is `unknown` rather than the member's own property
 * type, so the narrowed value is
 * `{ a: number } | ({ b: string } & Record<'a', unknown>)` and reading the
 * property gives `unknown`. Narrowing a union by a discriminant is better
 * served by a `'a' in v` check.
 *
 * @example
 * ```ts
 * const v = { a: 1 } as { a: number } | { b: string }
 * if (hasProperty(v, 'a')) {
 *   v.a // unknown, not number
 * }
 *
 * hasProperty({ a: 0 }, 'a') // false -- 0 is falsy
 * ```
 */
export function hasProperty<T, P extends UnionKeys<T>>(value: T, prop: P): value is T & Record<P, T[P]> {
	return !!value[prop]
}
