import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsAny } from '../any/is_any.js'
import type { And, Or } from '../logical/logical.js'
import type { IsNever } from '../never/is_never.js'
import type { IsObject } from '../object/is_object.js'
import type { Properties } from '../object/properties.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsEqual } from './is_equal.js'

/**
 * 🎭 *predicate*
 *
 * Validate `A` and `B` are "equal".
 *
 * Note that intersection type checks only works at first level.
 * It cannot be check recursively,
 * or else will run into infinite recursion if the type includes recursive types.
 *
 * @example
 * ```ts
 * type R = Equal<undefined, undefined> // true
 *
 * type R = Equal<never, undefined> // false
 * type R = Equal<unknown, undefined> // false
 * type R = Equal<string | boolean, undefined> // false
 *
 * type R = Equal<string | undefined, undefined> // boolean
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = Equal<undefined, undefined, Equal.$Branch> // $Then
 * type R = Equal<string, undefined, Equal.$Branch> // $Else
 * ```
 */
export type Equal<A, B, $O extends $StrictOptions<$O, Equal.$Options> = {}> = [A, B] extends [B, A]
	? BothNever<
			A,
			B,
			$ResolveBranch<$O, [$Then]>,
			$ResolveBranch<$O, [$Else]>,
			BothAny<
				A,
				B,
				$ResolveBranch<$O, [$Then]>,
				$ResolveBranch<$O, [$Else]>,
				Equal.$Same<
					A,
					B,
					{
						$then: $ResolveBranch<$O, [$Then]>
						$else: [IsObject<A>, IsObject<B>] extends [true, true]
							? Equal.$Same<
									Properties<A>,
									Properties<B>,
									{
										$then: [A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
											? IsEqual<P1, P2, $ResolveBranch<$O, [$Then]>, $ResolveBranch<$O, [$Else]>>
											: $ResolveBranch<$O, [$Then]>
										$else: $ResolveBranch<$O, [$Else]>
									}
								>
							: // `A` and `B` are narrowed, need to check again.
								// This is fixed in TS 5.0.2, but keeping it to support older versions.
								[A, B] extends [B, A]
								? $ResolveBranch<$O, [$Then]>
								: $ResolveBranch<$O, [$Else]>
					}
				>
			>
		>
	: $ResolveBranch<$O, [$Else], A>

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
// export type Equal<A, B, $O extends Equal.$Options = {}> = [
// 	$Special<A, $Special.Branch>,
// 	$Special<B, $Special.Branch>,
// ] extends [infer $A, infer $B]
// 	? [$A, $B] extends [$B, $A]
// 		? $A extends $Else
// 			? // Both `$A` and `$B` are non-special types.
// 			[IsObject.$<A, IsObject.$Branch>, IsObject.$<B, IsObject.$Branch>] extends [$Then, $Then]
// 			? Equal.$Same<
// 			Properties<A>,
// 			Properties<B>,
// 			{
// 				$then: [A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
// 				? Equal<P1, P2, $O>
// 				: $ResolveBranch<A, $O, [$Then]>,
// 				$else: $ResolveBranch<A, $O, [$Else]>
// 			}>: [A, B] extends [B, A] ?
// 			$ResolveBranch<A, $O, [$Then]>:
// 			$ResolveBranch<A, $O, [$Else]>
// 				// Equal.$Same<
// 				// 	Equal.$ToProps<A>,
// 				// 	Equal.$ToProps<B>,
// 				// 	{
// 				// 		$then: $ResolveBranch<A, $O, [$Then]>
// 				// 		$else: $ResolveBranch<A, $O, [$Else]>
// 				// 	}
// 				// >
// 			: $ResolveBranch<A, $O, [$Then]>
// 		: $ResolveBranch<A, $O, [$Else]>
// 	: $InferError<'Unable to infer type of $A or $B'>

export namespace Equal {
	export interface $Options extends $Selection.$BaseOptions {}
	export type $Default = $Selection.Predicate
	export type $Branch = $Selection.Branch

	export type _ExactEqualDistributive<T, U, $O extends $Options> = T extends U
		? U extends T
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>
	export type _ExactEqualNonDistributive<T, U, $O extends $Options> = [T, U] extends [U, T]
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>

	/**
	 * 🎭 *predicate*
	 *
	 * Validate `A` and `B` are identically equal.
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

	// export type $ToProps<T> = T extends (...args: infer A) => infer R
	// 	? T extends ((...args: A) => R) & infer U
	// 		? [unknown] extends [U]
	// 			? T
	// 			: Properties<U>
	// 		: 1
	// 	: T extends Function & infer U
	// 		? [unknown] extends [U]
	// 			? T
	// 			: Properties<U>
	// 		: T extends any[]
	// 			? [T] extends [T[0][] & infer U]
	// 				? [unknown] extends [U]
	// 					? T
	// 					: T[0][] & Properties<U>
	// 				: $InferError<'Cannot infer extra properties from Array'>
	// 			: Properties<T>
}
