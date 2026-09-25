import type { Assignable } from './assignable.js'

/**
 * A compile-time assignability assertion, curried so `T` can be named
 * explicitly while the subject's type is inferred.
 *
 * `canAssign<T>()(subject)` compiles only when `subject` is assignable to `T`,
 * and `canAssign<T>(false)(subject)` compiles only when it is *not*. Both
 * always return `true` at runtime -- the value is not the point, the compile
 * error is. The return *type* is `Assignable<S, T>`, so a partially-assignable
 * union surfaces as `boolean` rather than `true`.
 *
 * Prefer `testType.*` for new assertions; this predates it.
 *
 * @example
 * ```ts
 * canAssign<{ a: string }>()({ a: 'a' }) // ok, typed true
 * canAssign<{ a: string }>()({ a: 'a', b: 'b' }) // ok -- extra properties are fine
 * // canAssign<{ a: string }>()({ a: 1 }) // compile error
 *
 * const t = canAssign<{ a: string }>(false)
 * t({ a: 1 }) // ok -- not assignable, which is what was asserted
 * // t({ a: '' }) // compile error
 * ```
 */
export function canAssign<T>(canAssign: false): <S>(subject: S extends T ? never : S) => true
export function canAssign<T>(): <S extends T>(subject: S) => Assignable<S, T>
export function canAssign<T>(): <S extends T>(subject: S) => any {
	return () => true
}
