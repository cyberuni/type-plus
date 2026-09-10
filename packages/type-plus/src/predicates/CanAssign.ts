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
 * type R = CanAssign<number | string, number> // boolean
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
 *
 * ## Special types
 *
 * `any`, `unknown` and `never` are answered by TypeScript's own assignability
 * relation rather than by `A extends B`, which gets all three wrong.
 *
 * `any` is assignable to every type except `never`, and every type is
 * assignable to `any`. So the relation is symmetric for `any` -- exactly as it
 * is in TypeScript, where both `const b: number = a` and `const c: any = n`
 * compile.
 *
 * @example
 * ```ts
 * type R = CanAssign<any, number> // true
 * type R = CanAssign<number, any> // true
 * type R = CanAssign<any, never> // false
 * ```
 *
 * `unknown` is the top type: everything is assignable to it, and it is
 * assignable only to `any` and `unknown`. The relation is *not* symmetric.
 *
 * @example
 * ```ts
 * type R = CanAssign<number, unknown> // true
 * type R = CanAssign<unknown, number> // false
 * ```
 *
 * `never` is the bottom type: it is assignable to everything, and nothing but
 * `never` is assignable to it.
 *
 * @example
 * ```ts
 * type R = CanAssign<never, number> // true
 * type R = CanAssign<number, never> // false
 * type R = CanAssign<never, never> // true
 * ```
 *
 * `void` is not special here -- it is answered structurally like any other
 * type.
 *
 * @example
 * ```ts
 * type R = CanAssign<undefined, void> // true
 * type R = CanAssign<number, void> // false
 * ```
 */
export type CanAssign<A, B, Then = true, Else = false> = 0 extends 1 & B
	? Then
	: [B, unknown] extends [unknown, B]
		? Then
		: [B, never] extends [never, B]
			? [A, never] extends [never, A]
				? Then
				: Else
			: 0 extends 1 & A
				? Then
				: [A, unknown] extends [unknown, A]
					? Else
					: [A, never] extends [never, A]
						? Then
						: boolean extends A
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
 * The special types follow the same rules as `CanAssign`: `any` is assignable
 * to everything but `never` and everything is assignable to `any`, `unknown`
 * is assignable only to `any` and `unknown`, and `never` is assignable to
 * everything.
 *
 * @example
 * ```ts
 * type R = StrictCanAssign<number | string, number> // false
 * type R = StrictCanAssign<number | string, number | string> // true
 *
 * type R = StrictCanAssign<any, number> // true
 * type R = StrictCanAssign<number, any> // true
 * type R = StrictCanAssign<unknown, number> // false
 * type R = StrictCanAssign<never, number> // true
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
 *
 * type R = IsAssign<any, number> // true
 * type R = IsAssign<number, any> // true
 * type R = IsAssign<unknown, number> // false
 * type R = IsAssign<never, number> // true
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
