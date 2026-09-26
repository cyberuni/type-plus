import * as _endsWith from './string-plus.ends-with.js'
import * as _includes from './string-plus.includes.js'
import * as _replace from './string-plus.replace.js'
import * as _replaceAll from './string-plus.replace-all.js'
import * as _split from './string-plus.split.js'
import * as _startsWith from './string-plus.starts-with.js'

/**
 * 🧰 *namespace*
 *
 * The type-level forms of the `String.prototype` methods, whose names are
 * too generic to sit on the top-level surface:
 *
 * - The predicates `StringPlus.Includes`, `StringPlus.StartsWith` and
 *   `StringPlus.EndsWith`.
 * - The transforms `StringPlus.Replace`, `StringPlus.ReplaceAll` and
 *   `StringPlus.Split`.
 *
 * `Includes` and `Split` are also exported top-level under the disambiguated
 * names `StringIncludes` and `StringSplit`. The type-level `join` is
 * `ArrayPlus.Join`, next to the other `Array.prototype` methods.
 * Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = StringPlus.Includes<'abc', 'a'> // true
 * type R = StringPlus.StartsWith<'abc', 'ab'> // true
 * type R = StringPlus.ReplaceAll<'a.b.c', '.', '/'> // 'a/b/c'
 * type R = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
 * ```
 */
export declare namespace StringPlus {
	export import EndsWith = _endsWith.EndsWith
	export import Includes = _includes.Includes
	export import Replace = _replace.Replace
	export import ReplaceAll = _replaceAll.ReplaceAll
	export import Split = _split.Split
	export import StartsWith = _startsWith.StartsWith
}
