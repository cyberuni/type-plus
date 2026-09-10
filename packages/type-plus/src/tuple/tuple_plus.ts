/**
 * 🧰 *namespace*
 *
 * The tuple-only implementations behind the array-or-tuple types that share
 * their names: `TuplePlus.CommonPropKeys`, `TuplePlus.DropMatch`,
 * `TuplePlus.Filter`, `TuplePlus.Find` and `TuplePlus.PadStart`.
 *
 * The top-level `Filter`, `DropMatch` and friends dispatch to these when
 * `A['length']` is a literal, and to the `ArrayPlus` versions when it is
 * `number`. Reach into this namespace when the input is known to be a tuple
 * and the dispatch is wasted work. Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
 * type R = TuplePlus.DropMatch<[1, 2, '3'], number> // ['3']
 * ```
 */

export type { CommonPropKeys } from './tuple_plus.common_prop_keys.js'
export type { DropMatch } from './tuple_plus.drop_match.js'
export type { Filter } from './tuple_plus.filter.js'
export type { Find } from './tuple_plus.find.js'
export type { PadStart } from './tuple_plus.pad_start.js'
