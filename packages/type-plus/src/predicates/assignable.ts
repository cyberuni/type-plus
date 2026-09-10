import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `A` is assignable to `B`.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any> // true
 * type R = Assignable<any, 1> // true
 * type R = Assignable<unknown, unknown> // true
 * type R = Assignable<never, never> // true
 * type R = Assignable<1, 1> // true
 * type R = Assignable<'a', 'a'> // true
 * type R = Assignable<'a', 'b'> // false
 * type R = Assignable<'a', string> // true
 * ```
 *
 * The special types follow TypeScript's own assignability relation:
 *
 * - `any` is assignable to every type except `never`,
 *   and every type is assignable to `any`.
 * - `unknown` is the top type: everything is assignable to it,
 *   and it is assignable only to `any` and `unknown`.
 * - `never` is the bottom type: it is assignable to everything,
 *   and nothing but `never` is assignable to it.
 * - `void` is not special here and is answered structurally.
 *
 * @example
 * ```ts
 * type R = Assignable<any, number> // true
 * type R = Assignable<number, any> // true
 * type R = Assignable<any, never> // false
 * type R = Assignable<unknown, number> // false
 * type R = Assignable<number, unknown> // true
 * type R = Assignable<never, number> // true
 * type R = Assignable<number, never> // false
 * type R = Assignable<undefined, void> // true
 * type R = Assignable<number, void> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` is assignable to `B`.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, { selection: 'filter' }> // any
 * type R = Assignable<1, number, { selection: 'filter' }> // 1
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, Assignable.$Branch> // $Then
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, { $any: 1 }> // 1
 * type R = Assignable<unknown, any, { $unknown: 1 }> // 1
 * type R = Assignable<never, any, { $never: 1 }> // 1
 * ```
 */
export type Assignable<A, B, $O extends Assignable.$Options = {}> = $Special<
	B,
	{
		$any: $ResolveBranch<$O, [0 extends 1 & A ? $Any : unknown, $Then], A>
		$unknown: $ResolveBranch<$O, [[A, unknown] extends [unknown, A] ? $Unknown : unknown, $Then], A>
		$never: $ResolveBranch<$O, [A, never] extends [never, A] ? [$Never, $Then] : [$Else], A>
		$void: _AssignableToOrdinary<A, B, $O>
		$else: _AssignableToOrdinary<A, B, $O>
	}
>

/**
 * `Assignable` with `B` already known not to be `any`, `unknown` or `never`.
 *
 * `void` shares this branch: it is only special to `$Special`, not to the
 * assignability relation, so it is answered structurally like any other type.
 */
type _AssignableToOrdinary<A, B, $O extends Assignable.$Options> = $Special<
	A,
	{
		$any: $ResolveBranch<$O, [$Any, $Then], A>
		$unknown: $ResolveBranch<$O, [$Unknown, $Else], A>
		$never: $ResolveBranch<$O, [$Never, $Then], A>
		$void: Assignable.$<A, B, $O>
		$else: Assignable.$<A, B, $O>
	}
>

export namespace Assignable {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Distributive.Options = {}> = $Selection.Branch & $O

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `A` is assignable to `B`.
	 *
	 * This is the internal logic of `Assignable`.
	 * It does not check against special types.
	 *
	 * It is suitable for building custom types.
	 */
	export type $<A, B, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: A extends B ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
			$else: [A] extends [B] ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
		}
	>

	export type $UtilOptions = $Selection.Options & $Distributive.Options
}
