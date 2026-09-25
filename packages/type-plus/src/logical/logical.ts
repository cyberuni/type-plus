import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 **predicate**
 *
 * Logical AND operation.
 *
 * `boolean` is either `true` or `false`, so it gives `boolean` unless the
 * other side settles the result. The `$then` and `$else` options replace the
 * `true` and `false` results.
 *
 * @example
 * ```ts
 * type R = And<true, true> // true
 * type R = And<true, false> // false
 * type R = And<boolean, true> // boolean
 * type R = And<boolean, false> // false
 * type R = And<true, true, { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type And<
	A extends boolean,
	B extends boolean,
	$O extends $StrictOptions<$O, $Selection.$BaseOptions> = {},
> = A extends true
	? B extends true
		? $ResolveBranch<$O, [$Then], A>
		: $ResolveBranch<$O, [$Else], A>
	: $ResolveBranch<$O, [$Else], A>

/**
 * 🎭 **predicate**
 *
 * Logical OR operation.
 *
 * `boolean` is either `true` or `false`, so it gives `boolean` unless the
 * other side settles the result. The `$then` and `$else` options replace the
 * `true` and `false` results.
 *
 * @example
 * ```ts
 * type R = Or<true, false> // true
 * type R = Or<false, false> // false
 * type R = Or<boolean, true> // true
 * type R = Or<boolean, false> // boolean
 * type R = Or<false, false, { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Or<
	A extends boolean,
	B extends boolean,
	$O extends $StrictOptions<$O, $Selection.$BaseOptions> = {},
> = A extends true
	? $ResolveBranch<$O, [$Then], A>
	: B extends true
		? $ResolveBranch<$O, [$Then], A>
		: $ResolveBranch<$O, [$Else], A>

/**
 * 🎭 **predicate**
 *
 * Logical NOT operation.
 *
 * The `$then` and `$else` options replace the `true` and `false` results.
 *
 * @example
 * ```ts
 * type R = Not<true> // false
 * type R = Not<false> // true
 * type R = Not<boolean> // boolean
 * type R = Not<false, { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Not<X extends boolean, $O extends $StrictOptions<$O, $Selection.$BaseOptions> = {}> = X extends true
	? $ResolveBranch<$O, [$Else], X>
	: $ResolveBranch<$O, [$Then], X>

/**
 * 🎭 **predicate**
 *
 * Logical XOR operation.
 *
 * `boolean` on either side gives `boolean`.
 *
 * @example
 * ```ts
 * type R = Xor<true, false> // true
 * type R = Xor<true, true> // false
 * type R = Xor<boolean, true> // boolean
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Xor<
	A extends boolean,
	B extends boolean,
	$O extends $StrictOptions<$O, $Selection.$BaseOptions> = {},
> = A extends true ? Not<B> : B extends true ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
