/**
 * 🧰 *namespace*
 *
 * The tuple-only halves of the five top-level types that dispatch by
 * `A['length']`: `TuplePlus.CommonPropKeys`, `TuplePlus.DropMatch`,
 * `TuplePlus.Filter`, `TuplePlus.Find` (behind `FindFirst`) and
 * `TuplePlus.PadStart`.
 *
 * The top-level `CommonPropKeys`, `DropMatch`, `Filter`, `FindFirst` and
 * `PadStart` send a tuple (literal length) here and an array (`number` length)
 * to the `ArrayPlus` member of the same name. Reach into this namespace when
 * the input is known to be a tuple and the dispatch is wasted work.
 *
 * Only those five have a tuple-only half. The other types that take an array
 * or a tuple, such as `At`, `Head`, `Last`, `Reverse` and `Some`, handle both
 * in one type and have no member here. Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
 * type R = TuplePlus.DropMatch<[1, 2, '3'], number> // ['3']
 * ```
 */

export type { CommonPropKeys } from './tuple-plus.common-prop-keys.js'
export type { DropMatch } from './tuple-plus.drop-match.js'
export type { Filter } from './tuple-plus.filter.js'
export type { Find } from './tuple-plus.find.js'
export type { PadStart } from './tuple-plus.pad-start.js'
