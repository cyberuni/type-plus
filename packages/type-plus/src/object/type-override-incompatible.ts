import type { ANotB, AnyRecord } from './index.js'

/**
 * Curried helper for reshaping a value into `A` while making the compiler
 * demand exactly the parts that do not already fit.
 *
 * `typeOverrideIncompatible<A>()` returns a function taking the `source` and an
 * `override` constrained to `ANotB<A, B>` -- the properties of `A` that
 * `source` is missing or declares with an incompatible type. Adding the right
 * property to `source` removes it from what the override has to supply, so the
 * compiler tracks the remaining work rather than accepting a blanket cast.
 *
 * At runtime it is `{ ...source, ...override }`, so the override wins on a
 * collision, and the result is typed `A`.
 *
 * @example
 * ```ts
 * const toTarget = typeOverrideIncompatible<{ a: number; b: string }>()
 *
 * const r = toTarget({ a: 1, b: 2 }, { b: 'x' })
 * // r === { a: 1, b: 'x' }, typed { a: number; b: string }
 * // `b` must be supplied: number is not assignable to string.
 * // `a` must not: it already fits.
 * ```
 */
export function typeOverrideIncompatible<A extends AnyRecord>() {
	return <B extends AnyRecord>(source: B, override: ANotB<A, B>): A => ({
		...source,
		...override,
	})
}
