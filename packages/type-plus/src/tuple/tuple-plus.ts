import * as _commonPropKeys from './tuple-plus.common-prop-keys.js'
import * as _dropMatch from './tuple-plus.drop-match.js'
import * as _filter from './tuple-plus.filter.js'
import * as _find from './tuple-plus.find.js'
import * as _padStart from './tuple-plus.pad-start.js'

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
export declare namespace TuplePlus {
	export import CommonPropKeys = _commonPropKeys.CommonPropKeys
	export import DropMatch = _dropMatch.DropMatch
	export import Filter = _filter.Filter
	export import Find = _find.Find
	export import PadStart = _padStart.PadStart
}
