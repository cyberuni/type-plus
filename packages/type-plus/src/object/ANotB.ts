import type { IsEqual } from '../equal/is_equal.js'
import type { AnyRecord } from './any_record.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeysWithDiffType } from './KeysWithDiffType.js'

/**
 * ⚗️ *transform*
 *
 * The part of `A` that `B` does not already satisfy:
 * the properties of `A` that `B` lacks, plus the properties both declare with
 * incompatible types.
 *
 * The two ends short-circuit: identical records produce `never`
 * (nothing is missing), and records sharing no keys produce `A` unchanged
 * (nothing is satisfied).
 *
 * @example
 * ```ts
 * type A = { a: number; b: string }
 * type B = { a: number; b: number; c: boolean }
 *
 * type R = ANotB<A, B> // { b: string }
 *
 * type R = ANotB<A, A> // never
 * type R = ANotB<{ a: 1 }, { b: 2 }> // { a: 1 }
 * ```
 */
export type ANotB<A extends AnyRecord, B extends AnyRecord> = IsEqual<A, B> extends true
	? never
	: IsDisjoint<A, B> extends true
		? A
		: { [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k] }

/**
 * ⚗️ *transform*
 *
 * `ANotB` with the arguments swapped: the part of `B` that `A` does not
 * already satisfy.
 *
 * @example
 * ```ts
 * type A = { a: number; b: string }
 * type B = { a: number; b: number; c: boolean }
 *
 * type R = BNotA<A, B> // { b: number; c: boolean }
 * ```
 */
export type BNotA<A extends AnyRecord, B extends AnyRecord> = ANotB<B, A>
