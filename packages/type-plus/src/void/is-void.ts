import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge-options.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsUndefined } from '../undefined/is-undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `void`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<never> // false
 * type R = IsVoid<unknown> // false
 * type R = IsVoid<string | boolean> // false
 *
 * type R = IsVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, { selection: 'filter' }> // void
 *
 * type R = IsVoid<never, { selection: 'filter' }> // never
 * type R = IsVoid<unknown, { selection: 'filter' }> // never
 * type R = IsVoid<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsVoid<string | void> // void
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsVoid<void | 1> // boolean
 * type R = IsVoid<void | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, IsVoid.$Branch> // $Then
 * type R = IsVoid<string, IsVoid.$Branch> // $Else
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsVoid<T, $O extends $StrictOptions<$O, IsVoid.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? false
		: unknown extends T
			? false
			: [T] extends [never]
				? false
				: void extends T
					? [T] extends [void]
						? true
						: _Else<T>
					: _Else<T>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$void: $ResolveBranch<$O, [$Void, $Then], T>
					$then: $ResolveBranch<$O, [$Else]>
					$else: IsVoid.$<T, $O>
				}
			>
		>

export namespace IsVoid {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsVoid` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsVoid.$Fn, void> // true
	 * type R = $Fn.Apply<IsVoid.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsVoid<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `undefined`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = IsUndefined.$<
		T,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: Assignable.$<T, void, $O>
		}
	>
}

type $UtilOptions = $Selection.Options & $Distributive.Options

/**
 * `IsVoid.$<T, {}>` spelled out, for the no-options shortcut.
 *
 * Like `IsVoid.$`, each member of `T` that is `undefined` answers `false`,
 * and every other member answers whether each member of the whole `T` is `void`.
 */
type _Else<T, U = T> = U extends undefined ? false : T extends void ? true : false
