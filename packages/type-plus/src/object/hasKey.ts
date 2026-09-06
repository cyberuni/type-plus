import type { AnyRecord } from './any_record.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `K` is a key of `T`, returning `Then` (default `true`) or `Else`
 * (default `false`).
 *
 * A plain `extends` check with no `$Options` support: it takes the branches as
 * ordinary type parameters and does not special-case `any`, `never` or
 * `unknown`.
 *
 * @example
 * ```ts
 * type R = HasKey<{ a: 1 }, 'a'> // true
 * type R = HasKey<{ a: 1 }, 'b'> // false
 *
 * type R = HasKey<{ a: 1 }, 'b', 'yes', 'no'> // 'no'
 * ```
 */
export type HasKey<T, K, Then = true, Else = false> = K extends keyof T ? Then : Else

/**
 * Checks the given keys on `subject`, typed as `HasKey<T, K>`.
 *
 * ⚠️ The runtime and the type disagree. The type is decided by whether `K` is
 * a key of `T`, so it is `true` for any declared key; the implementation tests
 * `subject[key]` for *truthiness*, so a declared key holding `0`, `''`,
 * `null` or `false` returns `false` at runtime while the type still says
 * `true`. It is a truthiness check, not `in`.
 *
 * @example
 * ```ts
 * const r = hasKey({ a: 1 }, 'a') // true, typed true
 * const r = hasKey({ a: 0 }, 'a') // false at runtime, still typed true
 * ```
 */
export function hasKey<T extends AnyRecord, K extends string>(subject: T, ...keys: K[]): HasKey<T, K> {
	return !keys.some((key) => !subject[key]) as unknown as HasKey<T, K>
}
