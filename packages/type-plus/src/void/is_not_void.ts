import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `void`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<never> // true
 * type R = IsNotVoid<unknown> // true
 * type R = IsNotVoid<string | boolean> // true
 *
 * type R = IsNotVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, { selection: 'filter' }> // never
 *
 * type R = IsNotVoid<never, { selection: 'filter' }> // never
 * type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotVoid<string | void, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void | string> // boolean
 * type R = IsNotVoid<void | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, IsNotVoid.$Branch> // $Else
 * type R = IsNotVoid<string, IsNotVoid.$Branch> // $Then
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNotVoid<T, $O extends $StrictOptions<$O, IsNotVoid.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? true
		: unknown extends T
			? true
			: [T] extends [never]
				? true
				: void extends T
					? [T] extends [void]
						? false
						: IsNotVoid._Else<T>
					: IsNotVoid._Else<T>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$then: $ResolveBranch<$O, [$Then], T>
					$void: $ResolveBranch<$O, [$Void, $Else]>
					$else: IsNotVoid.$<T, $O>
				}
			>
		>

export namespace IsNotVoid {
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
	 * `IsNotVoid` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsVoid.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotVoid.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotVoid.$Fn, void> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotVoid<this['in'], $O>
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
			$then: $ResolveBranch<$O, [$Then], T>
			$else: NotAssignable.$<T, void, $O>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions

	/**
	 * `IsNotVoid.$<T, {}>` spelled out, for the no-options shortcut.
	 *
	 * Like `IsNotVoid.$`, each member of `T` that is `undefined` answers `true`,
	 * and every other member answers whether each member of the whole `T` is not `void`.
	 */
	export type _Else<T, U = T> = U extends undefined ? true : T extends void ? false : true
}
