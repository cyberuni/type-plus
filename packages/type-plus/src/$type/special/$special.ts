import type { $BranchOptions } from '../branch/$branch.js'
import type { $InputOptions } from '../branch/$input-options.js'
import type { $ResolveBranch } from '../branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../branch/$selection.js'
import type { $Any } from './$any.js'
import type { $Never } from './$never.js'
import type { $Unknown } from './$unknown.js'
import type { $Void } from './$void.js'

// The guards below are ordered: `any` also passes the `unknown` check, and `unknown` passes `void extends T`.
// Each spells mutual assignability in its cheapest form; `[T, X] extends [X, T]` costs about three times as
// many instantiations. `$Special.Values` repeats these guards; its spec pins the two together.
/**
 * A type to handle special types: `any`, `unknown`, `never`, and `void`.
 *
 * @example
 * ```ts
 * type YourType<T, $Options extends $Special.Options> = Special<T,
 * {
 *   $any: $ResolveBranch<$Options, [$Any, ...], T>
 *   $unknown: $ResolveBranch<$Options, [$Unknown, ...], T>
 *   $never: $ResolveBranch<$Options, [$Never, ...], T>
 *   $void: $ResolveBranch<$Options, [$Void, ...], T>
 *   $then: $ResolveBranch<$Options, [...], T>
 *   $else: $ResolveBranch<$Options, [...], T>
 * }>
 *
 * @since 🏷️ 8.0.0
 */
export type $Special<T, $O extends $Special.Options = {}> = 0 extends 1 & T
	? $ResolveBranch<$O, [$Any, $Then], T>
	: unknown extends T
		? $ResolveBranch<$O, [$Unknown, $Then], T>
		: [T] extends [never]
			? $ResolveBranch<$O, [$Never, $Then], T>
			: void extends T
				? [T] extends [void]
					? $ResolveBranch<$O, [$Void, $Then], T>
					: $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Else]>

export namespace $Special {
	export type Options = $Selection.Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch = $Selection.Branch & $BranchOptions<$Any | $Unknown | $Never | $Void>

	/**
	 * Picks the answer for `T` from `$Answers` by whether `T` is `any`, `unknown`, `never`, `void`, or none of them.
	 *
	 * It detects the special types exactly as `$Special` does,
	 * but reads each answer straight from `$Answers` instead of resolving it from options.
	 * That skips the options machinery, so a type can use it as a shortcut when it gets no options.
	 * Only the picked answer is evaluated.
	 *
	 * @example
	 * ```ts
	 * type R = $Special.Values<any, { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }> // 1
	 * type R = $Special.Values<unknown, { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }> // 2
	 * type R = $Special.Values<never, { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }> // 3
	 * type R = $Special.Values<void, { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }> // 4
	 * type R = $Special.Values<string, { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }> // 5
	 * ```
	 *
	 * @example
	 * ```ts
	 * type IsObject<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = [keyof $O] extends [never]
	 *   ? $Special.Values<T, { $any: false; $unknown: false; $never: false; $void: false; $else: T extends object ? true : false }>
	 *   : // the full path, resolving $O
	 * ```
	 *
	 * @since 🏷️ 8.0.0
	 */
	export type Values<T, $Answers extends ValuesAnswers> = 0 extends 1 & T
		? $Answers['$any']
		: unknown extends T
			? $Answers['$unknown']
			: [T] extends [never]
				? $Answers['$never']
				: void extends T
					? [T] extends [void]
						? $Answers['$void']
						: $Answers['$else']
					: $Answers['$else']

	/**
	 * The answers `$Special.Values` picks from, one per kind of type.
	 */
	export type ValuesAnswers = {
		$any: unknown
		$unknown: unknown
		$never: unknown
		$void: unknown
		$else: unknown
	}
}
