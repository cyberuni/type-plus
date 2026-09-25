import * as _includes from './string-plus.includes.js'
import * as _split from './string-plus.split.js'

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
export declare namespace StringPlus {
	export import Includes = _includes.Includes
	export import Split = _split.Split
}
