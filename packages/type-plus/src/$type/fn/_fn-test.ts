import type { $Fn } from './$fn.js'

/**
 * Whether the type function `F` returns exactly `true` for `T`.
 *
 * `[R, true] extends [true, R]` holds only when `R` is `true` (or `any`):
 * `boolean` fails the first position and `never` fails the second.
 */
export type _FnTest<T, F extends $Fn> = $Fn.Apply<F, T> extends infer R
	? [R, true] extends [true, R]
		? true
		: false
	: never
