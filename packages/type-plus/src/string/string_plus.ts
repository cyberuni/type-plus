import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { StringIncludes, StringSplit } from './string.js'

/**
 * 🧰 *namespace*
 *
 * The string types whose names are too generic to sit on the top-level
 * surface: `StringPlus.Includes` and `StringPlus.Split`, the type-level
 * `String.prototype.includes` and `String.prototype.split`.
 *
 * Both are also exported top-level under the disambiguated names
 * `StringIncludes` and `StringSplit`. Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = StringPlus.Includes<'abc', 'a'> // true
 * type R = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
 * ```
 */
export namespace StringPlus {
	/**
	 * 🎭 *predicate*
	 *
	 * Check if `Subject` includes `Search`.
	 * If either of them is not a string, takes the `$else` branch.
	 *
	 * ```ts
	 * type R = StringPlus.Includes<'abc', 'a'> // true
	 *
	 * type R = StringPlus.Includes<'abc', 'd'> // false
	 *
	 * type R = StringPlus.Includes<'abc', 'd', { $then: 'yes'; $else: 'no' }> // 'no'
	 * ```
	 *
	 * 🔢 *customize*
	 *
	 * Filter to keep `Subject` when it includes `Search`, otherwise returns `never`.
	 *
	 * ```ts
	 * type R = StringPlus.Includes<'abc', 'a', { selection: 'filter' }> // 'abc'
	 * type R = StringPlus.Includes<'abc', 'd', { selection: 'filter' }> // never
	 * ```
	 *
	 * 🔢 *customize*
	 *
	 * Use unique branch identifiers to allow precise processing of the result.
	 *
	 * ```ts
	 * type R = StringPlus.Includes<'abc', 'a', StringPlus.Includes.$Branch> // $Then
	 * type R = StringPlus.Includes<'abc', 'd', StringPlus.Includes.$Branch> // $Else
	 * ```
	 */
	export type Includes<
		Subject extends string,
		Search extends string,
		$O extends Includes.$Options = {},
	> = StringIncludes<Subject, Search, $ResolveBranch<$O, [$Then], Subject>, $ResolveBranch<$O, [$Else]>>

	export namespace Includes {
		export type $Options = $Selection.Options
		export type $Default = $Selection.Predicate
		export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
	}

	/**
	 * Split a string into substrings using the specified separator,
	 * and return them as an array.
	 *
	 * ```ts
	 * type R = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
	 * type R = StringPlus.Split<'abc', 'a'> // ['', 'bc']
	 * type R = StringPlus.Split<'abc', 'b'> // ['a', 'c']
	 * type R = StringPlus.Split<'abc', 'c'> // ['ab', '']
	 * ```
	 */
	export type Split<Subject extends string, Seperator extends string> = StringSplit<Subject, Seperator>
}
