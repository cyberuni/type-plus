import type { AnyRecord } from './any_record.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { ValueOf } from './ValueOf.js'

/**
 * ⚗️ *transform*
 *
 * The keys `A` and `B` share whose property types disagree,
 * i.e. the keys `k` of both where `A[k]` is not assignable to `B[k]`.
 *
 * The comparison runs one way. A key is reported when `A[k]` does not extend
 * `B[k]`, so a widening (`1` against `number`) is not a difference while the
 * narrowing (`number` against `1`) is.
 *
 * Records sharing no keys short-circuit to `never`.
 *
 * @example
 * ```ts
 * type A = { a: number; b: string }
 * type B = { a: number; b: number; c: boolean }
 *
 * type R = KeysWithDiffType<A, B> // 'b'
 *
 * type R = KeysWithDiffType<{ a: 1 }, { a: number }> // never
 * type R = KeysWithDiffType<{ a: number }, { a: 1 }> // 'a'
 *
 * type R = KeysWithDiffType<{ a: 1 }, { a: 1 }> // never
 * type R = KeysWithDiffType<{ a: 1 }, { b: 2 }> // never
 * ```
 */
export type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord> = IsDisjoint<A, B> extends true
	? never
	: ValueOf<{
			[k in keyof A & keyof B]: A[k] extends B[k] ? never : k
		}>
