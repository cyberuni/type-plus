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
 * Validate if `T` survives a JSON round trip: `T` is assignable to
 * `JsonCompatible<T>`.
 *
 * Unlike `T extends JsonTypes`, it accepts an `interface`, readonly arrays and
 * tuples, and optional properties. It rejects functions, objects with methods
 * (such as `Date`), `bigint`, `symbol` and `undefined` values.
 *
 * To find out *where* a type fails, constrain with `JsonCompatible` instead:
 * its compiler error names the path of the offending property.
 *
 * @example
 * ```ts
 * interface User { id: number; tags: string[]; nick?: string }
 *
 * type R = IsJson<User> // true
 * type R = IsJson<{ a: readonly [1, 2] }> // true
 * type R = IsJson<null> // true
 *
 * type R = IsJson<{ a: Date }> // false
 * type R = IsJson<{ a: undefined }> // false
 * type R = IsJson<undefined> // false
 * type R = IsJson<never> // false
 * type R = IsJson<unknown> // false
 *
 * type R = IsJson<string | Date> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` survives a JSON round trip, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsJson<User, { selection: 'filter' }> // User
 * type R = IsJson<string | Date, { selection: 'filter' }> // string
 * type R = IsJson<Date, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsJson<string | Date> // boolean
 * type R = IsJson<string | Date, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsJson<User, IsJson.$Branch> // $Then
 * type R = IsJson<Date, IsJson.$Branch> // $Else
 * ```
 *
 * Without options, it answers through `$Special.Values`, skipping the options machinery.
 *
 * @since 🏷️ 8.0.0
 */
export type IsJson<T, $O extends $StrictOptions<$O, IsJson.$Options> = {}> = [keyof $O] extends [never]
	? $Special.Values<
			T,
			{ $any: false; $unknown: false; $never: false; $void: false; $else: T extends JsonCompatible<T> ? true : false }
		>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$then: $ResolveBranch<$O, [$Else]>
					$else: IsJson.$<T, $O>
				}
			>
		>

export namespace IsJson {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsJson` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsJson.$Fn, { a: 1 }> // true
	 * type R = $Fn.Apply<IsJson.$Fn, Date> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsJson<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` survives a JSON round trip.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: T extends JsonCompatible<T> ? $ResolveBranch<$O, [$Then], T> : $ResolveBranch<$O, [$Else]>
			$else: [T] extends [JsonCompatible<T>] ? $ResolveBranch<$O, [$Then], T> : $ResolveBranch<$O, [$Else]>
		}
	>
}

type $UtilOptions = $Selection.Options & $Distributive.Options
