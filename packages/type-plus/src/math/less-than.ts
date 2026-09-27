import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { GreaterThan } from './greater-than.js'

/**
 * 🎭 *predicate*
 *
 * `A < B` at the type level, on `number` literals.
 *
 * It is `GreaterThan<B, A>`, so it inherits every one of its limits: `bigint`
 * is not supported, and a non-literal operand is not supported. Each of those
 * resolves to `$fail` (`never` by default).
 *
 * @example
 * ```ts
 * type R = LessThan<1, 2> // true
 * type R = LessThan<1, 1> // false
 * type R = LessThan<2, 1> // false
 * type R = LessThan<-2, -1> // true
 * type R = LessThan<1.4, 1.5> // true
 * type R = LessThan<1.5, 2.5> // true
 *
 * type R = LessThan<number, 1> // never
 * type R = LessThan<1n, 2n> // never -- bigint is not supported
 * ```
 */
export type LessThan<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, LessThan.$Options> = {},
> = GreaterThan<B, A, $O>

export namespace LessThan {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
