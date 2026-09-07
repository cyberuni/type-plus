import type { Assignable } from './assignable.js'
import type { NotExtendable } from './Extends.js'

/**
 * Can `A` assign to `B`
 *
 * Note that when union is involved, the assignability is measured distributively.
 * Meaning the result can be `Then | Else` (i.e. `boolean` by default),
 * instead of distinctive `Then` (`true`) or `Else` (`false`).
 *
 * This is the correct behavior.
 *
 * @deprecated use `Assignable<A, B>` instead
 *
 * @example
 * ```ts
 * CanAssign<number | string, number> // boolean
 * ```
 *
 * We are checking can `A` assign to `B`.
 * Since `A` is `number | string`,
 * `A` can assign to `B` when `A` is number` (true), and
 * `A` cannot assign to `B` when `A` is string` (false).
 * So the result is `true | false = boolean`.
 *
 * If you want to make sure all branches are assignable,
 * use `StrictCanAssign<A, B>`.
 */
export type CanAssign<A, B, Then = true, Else = false> = boolean extends A
	? boolean extends B
		? Then
		: Else
	: A extends B
		? Then
		: Else

/**
 * Can `A` strictly assign to `B`.
 *
 * All branches in an union `A` are assignable to `B`.
 *
 * @deprecated use `Assignable<A, B, { distributive: false }>` instead
 *
 * @example
 * ```ts
 * StrictCanAssign<number | string, number> // false
 * StrictCanAssign<number | string, number | string> // true
 * ```
 */
export type StrictCanAssign<A, B, Then = true, Else = false> = Assignable<
	A,
	B,
	{ distributive: false; $then: Then; $else: Else }
>

/**
 * 🎭 *predicate*
 *
 * An alias of `CanAssign<A, B, Then, Else>`, unchanged in behavior: it
 * distributes over a union, so a partially-assignable union gives `boolean`.
 *
 * #665 lists this type for removal in favour of `Assignable`.
 *
 * @deprecated use `Assignable<A, B>` instead
 *
 * @example
 * ```ts
 * type R = IsAssign<1, number> // true
 * type R = IsAssign<boolean, boolean> // true
 *
 * type R = IsAssign<number | string, number> // boolean
 * ```
 */
export type IsAssign<A, B, Then = true, Else = false> = CanAssign<A, B, Then, Else>

/**
 * A compile-time assignability assertion, curried so `T` can be named
 * explicitly while the subject's type is inferred.
 *
 * `canAssign<T>()(subject)` compiles only when `subject` is assignable to `T`,
 * and `canAssign<T>(false)(subject)` compiles only when it is *not*. Both
 * always return `true` at runtime -- the value is not the point, the compile
 * error is. The return *type* is `CanAssign<S, T>`, so a partially-assignable
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
export function canAssign<T>(canAssign: false): <S>(subject: NotExtendable<S, T>) => true
export function canAssign<T>(): <S extends T>(subject: S) => CanAssign<S, T>
export function canAssign<T>(): <S extends T>(subject: S) => any {
	return () => true
}
