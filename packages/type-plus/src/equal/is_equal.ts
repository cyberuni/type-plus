import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsAny } from '../any/is_any.js'
import type { And, Or } from '../logical/logical.js'
import type { IsNever } from '../never/is_never.js'
import type { IsObject } from '../object/is_object.js'
import type { Properties } from '../object/properties.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate `A` and `B` are equal.
 *
 * Note that intersection type checks only works at first level.
 * It cannot be check recursively,
 * or else will run into infinite recursion if the type includes recursive types.
 *
 * @example
 * ```ts
 * type R = IsEqual<1, 1> // true
 * type R = IsEqual<any, any> // true
 * type R = IsEqual<boolean, boolean> // true
 * type R = IsEqual<[1], [1]> // true
 *
 * type R = IsEqual<boolean, true> // false
 * type R = IsEqual<any, 1> // false
 * type R = IsEqual<[any], [1]> // false
 * type R = IsEqual<{ a: 1 }, { a: 1; b: 2 }> // false
 * type R = IsEqual<never, undefined> // false
 *
 * type R = IsEqual<string | undefined, undefined> // boolean
 * ```
 *
 * `symbol` gets no special treatment: two distinct `unique symbol`s are not equal,
 * and a `unique symbol` is not equal to `symbol`.
 * Before 8.0.0, `IsEqual` reported both of those as equal.
 *
 * @example
 * ```ts
 * declare const s1: unique symbol
 * declare const s2: unique symbol
 *
 * type R = IsEqual<typeof s1, typeof s1> // true
 * type R = IsEqual<typeof s1, typeof s2> // false
 * type R = IsEqual<typeof s1, symbol> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` equals `B`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsEqual<1, 1, { selection: 'filter' }> // 1
 * type R = IsEqual<1, number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Override the branches directly.
 *
 * @example
 * ```ts
 * type R = IsEqual<1, 1, { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = IsEqual<1, 2, { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsEqual<undefined, undefined, IsEqual.$Branch> // $Then
 * type R = IsEqual<string, undefined, IsEqual.$Branch> // $Else
 * ```
 */
export type IsEqual<A, B, $O extends $StrictOptions<$O, IsEqual.$Options> = {}> = [A, B] extends [B, A]
	? BothNever<
			A,
			B,
			$ResolveBranch<$O, [$Then], A>,
			$ResolveBranch<$O, [$Else]>,
			BothAny<
				A,
				B,
				$ResolveBranch<$O, [$Then], A>,
				$ResolveBranch<$O, [$Else]>,
				IsEqual.$Same<
					A,
					B,
					{
						$then: $ResolveBranch<$O, [$Then], A>
						$else: [IsObject<A>, IsObject<B>] extends [true, true]
							? IsEqual.$Same<
									Properties<A>,
									Properties<B>,
									{
										$then: [A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
											? IsEqual<P1, P2, { $then: $ResolveBranch<$O, [$Then], A>; $else: $ResolveBranch<$O, [$Else]> }>
											: $ResolveBranch<$O, [$Then], A>
										$else: $ResolveBranch<$O, [$Else]>
									}
								>
							: // `A` and `B` are narrowed, need to check again.
								// This is fixed in TS 5.0.2, but keeping it to support older versions.
								[A, B] extends [B, A]
								? $ResolveBranch<$O, [$Then], A>
								: $ResolveBranch<$O, [$Else]>
					}
				>
			>
		>
	: $ResolveBranch<$O, [$Else]>

type BothNever<A, B, Both, One, None> = And<
	IsNever<A>,
	IsNever<B>,
	{
		$then: Both
		$else: Or<
			IsNever<A>,
			IsNever<B>,
			{
				$then: One
				$else: None
			}
		>
	}
>

type BothAny<A, B, Both, One, None> = And<
	IsAny<A>,
	IsAny<B>,
	{
		$then: Both
		$else: Or<
			IsAny<A>,
			IsAny<B>,
			{
				$then: One
				$else: None
			}
		>
	}
>

export namespace IsEqual {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsEqual` as a type function, with `B` and its options `$O` applied.
	 *
	 * The function's input is the value being checked, so `B`, the type the input must equal, is fixed up front.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsEqual.$Fn<1>, 1> // true
	 * type R = $Fn.Apply<IsEqual.$Fn<1>, number> // false
	 *
	 * type R = TuplePlus.Filter<[1, number, 1], IsEqual.$Fn<1>> // [1, 1]
	 * ```
	 */
	export interface $Fn<B, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsEqual<this['in'], B, $O>
	}

	/**
	 * 🎭 *predicate*
	 *
	 * Validate `A` and `B` are identically equal.
	 *
	 * It is the raw identity check `IsEqual` is built on:
	 * it does not special-case `any` or `never`, and does not look through intersections.
	 * `$O` must spell out both `$then` and `$else`.
	 *
	 * @example
	 * ```ts
	 * type R = IsEqual.$Same<1, 1, { $then: 'yes'; $else: 'no' }> // 'yes'
	 * type R = IsEqual.$Same<{ a: 1 } & { b: 1 }, { a: 1; b: 1 }, { $then: 'yes'; $else: 'no' }> // 'no'
	 * ```
	 */
	export type $Same<A, B, $O extends $Options> = (<_>() => _ extends (A & _) | _ ? 1 : 2) extends <_>() => _ extends
		| (B & _)
		| _
		? 1
		: 2
		? $O['$then']
		: $O['$else']

	export type $ToProps<T> = Assignable.$<
		object,
		T,
		{
			$then: T & Properties<T>
			$else: T & Properties<T>
		}
	>
}

export type _ExactEqualNonDistributive<T, U, $O extends IsEqual.$Options> = [T, U] extends [U, T]
	? $ResolveBranch<$O, [$Then], T>
	: $ResolveBranch<$O, [$Else]>

/**
 * 🎭 *predicate*
 *
 * Validate `A` and `B` are not equal.
 *
 * The inverse of `IsEqual`, with the same rules.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, 1> // false
 * type R = IsNotEqual<any, any> // false
 * type R = IsNotEqual<[1], [1]> // false
 *
 * type R = IsNotEqual<boolean, true> // true
 * type R = IsNotEqual<any, 1> // true
 * type R = IsNotEqual<{ a: 1 }, { a: 1; b: 2 }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` does not equal `B`, otherwise returns `never`.
 * The filter keeps `A`, the input being checked.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, number, { selection: 'filter' }> // 1
 * type R = IsNotEqual<1, 1, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, 2, IsNotEqual.$Branch> // $Then
 * type R = IsNotEqual<1, 1, IsNotEqual.$Branch> // $Else
 * ```
 */
export type IsNotEqual<A, B, $O extends $StrictOptions<$O, IsNotEqual.$Options> = {}> = IsEqual<
	A,
	B,
	{
		$then: $ResolveBranch<$O, [$Else]>
		$else: $ResolveBranch<$O, [$Then], A>
	}
>

export namespace IsNotEqual {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotEqual` as a type function, with `B` and its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotEqual.$Fn<1>, number> // true
	 * type R = $Fn.Apply<IsNotEqual.$Fn<1>, 1> // false
	 *
	 * type R = TuplePlus.Filter<[1, number, 1], IsNotEqual.$Fn<1>> // [number]
	 * ```
	 */
	export interface $Fn<B, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotEqual<this['in'], B, $O>
	}
}
