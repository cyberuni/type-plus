import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 **predicate**
 *
 * Logical AND operation.
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
 * @since 🏷️ 8.0.0
 */
export type Xor<
	A extends boolean,
	B extends boolean,
	$O extends $StrictOptions<$O, $Selection.$BaseOptions> = {},
> = A extends true ? Not<B> : B extends true ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
