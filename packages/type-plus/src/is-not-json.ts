import type { $InputOptions } from './$type/branch/$input-options.js'
import type { $ResolveBranch } from './$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from './$type/branch/$selection.js'
import type { $Distributive } from './$type/distributive/$distributive.js'
import type { $Fn as $FnBase } from './$type/fn/$fn.js'
import type { $Any } from './$type/special/$any.js'
import type { $Never } from './$type/special/$never.js'
import type { $Special } from './$type/special/$special.js'
import type { $Unknown } from './$type/special/$unknown.js'
import type { $Void } from './$type/special/$void.js'
import type { $MergeOptions } from './$type/utils/$merge-options.js'
import type { $StrictOptions } from './$type/utils/$strict-options.js'
import type { JsonCompatible } from './json-compatible.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` does not survive a JSON round trip: `T` is not assignable to
 * `JsonCompatible<T>`.
 *
 * The negation of `IsJson`. To find out *where* a type fails, constrain with
 * `JsonCompatible`: its compiler error names the path of the offending property.
 *
 * @example
 * ```ts
 * interface User { id: number; tags: string[]; nick?: string }
 *
 * type R = IsNotJson<User> // false
 * type R = IsNotJson<null> // false
 *
 * type R = IsNotJson<{ a: Date }> // true
 * type R = IsNotJson<{ a: undefined }> // true
 * type R = IsNotJson<undefined> // true
 * type R = IsNotJson<never> // true
 * type R = IsNotJson<unknown> // true
 *
 * type R = IsNotJson<string | Date> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` does not survive a JSON round trip, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotJson<string | Date, { selection: 'filter' }> // Date
 * type R = IsNotJson<User, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotJson<string | Date> // boolean
 * type R = IsNotJson<string | Date, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotJson<Date, IsNotJson.$Branch> // $Then
 * type R = IsNotJson<User, IsNotJson.$Branch> // $Else
 * ```
 *
 * Without options, it answers through `$Special.Values`, skipping the options machinery.
 *
 * @since 🏷️ 8.0.0
 */
export type IsNotJson<T, $O extends $StrictOptions<$O, IsNotJson.$Options> = {}> = [keyof $O] extends [never]
	? $Special.Values<
			T,
			{ $any: true; $unknown: true; $never: true; $void: true; $else: T extends JsonCompatible<T> ? false : true }
		>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$then: $ResolveBranch<$O, [$Then], T>
					$else: IsNotJson.$<T, $O>
				}
			>
		>

export namespace IsNotJson {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotJson` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsJson.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotJson.$Fn, Date> // true
	 * type R = $Fn.Apply<IsNotJson.$Fn, { a: 1 }> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotJson<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` does not survive a JSON round trip.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: T extends JsonCompatible<T> ? $ResolveBranch<$O, [$Else]> : $ResolveBranch<$O, [$Then], T>
			$else: [T] extends [JsonCompatible<T>] ? $ResolveBranch<$O, [$Else]> : $ResolveBranch<$O, [$Then], T>
		}
	>
}

type $UtilOptions = $Selection.Options & $Distributive.Options
