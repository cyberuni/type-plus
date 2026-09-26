import * as _commonPropKeys from './array-plus.common-prop-keys.js'
import * as _dropMatch from './array-plus.drop-match.js'
import * as _elementMatch from './array-plus.element-match.js'
import * as _entries from './array-plus.entries.js'
import * as _filter from './array-plus.filter.js'
import * as _find from './array-plus.find.js'
import * as _indexAt from './array-plus.index-at.js'
import * as _isIndexOutOfBound from './array-plus.is-index-out-of-bound.js'
import * as _isReadonly from './array-plus.is-readonly.js'
import * as _padStart from './array-plus.pad-start.js'
import * as _reverse from './array-plus.reverse.js'
import * as _splitAt from './array-plus.split-at.js'
import * as _at from './at.js'
import * as _findLast from './find-last.js'
import * as _some from './some.js'

/**
 * 🧰 *namespace*
 *
 * The array types, in four groups:
 *
 * - Array-only, with no top-level export: `ArrayPlus.Entries`,
 *   `ArrayPlus.ElementMatch`, `ArrayPlus.IndexAt`,
 *   `ArrayPlus.IsIndexOutOfBound`, `ArrayPlus.IsReadonly` and
 *   `ArrayPlus.SplitAt`.
 * - The array-only half of a top-level type that dispatches by
 *   `A['length']`: `ArrayPlus.CommonPropKeys`, `ArrayPlus.DropMatch`,
 *   `ArrayPlus.Filter`, `ArrayPlus.Find` (behind `FindFirst`) and
 *   `ArrayPlus.PadStart`. The top-level type sends an array (`number` length)
 *   here and a tuple to the `TuplePlus` member of the same name.
 * - The same type as the top-level export of that name, grouped here too:
 *   `ArrayPlus.At`, `ArrayPlus.FindLast` and `ArrayPlus.Some`.
 * - `ArrayPlus.Reverse`, which is not the top-level `Reverse`: it accepts a
 *   readonly array or tuple and keeps it readonly.
 *
 * Each member carries its own TSDoc; this is a container, not a type.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Entries<[1, 2]> // [[0, 1], [1, 2]]
 * type R = ArrayPlus.IsReadonly<readonly number[]> // true
 * ```
 */
export declare namespace ArrayPlus {
	export import At = _at.At
	export import CommonPropKeys = _commonPropKeys.CommonPropKeys
	export import DropMatch = _dropMatch.DropMatch
	export import ElementMatch = _elementMatch.ElementMatch
	export import Entries = _entries.Entries
	export import Filter = _filter.Filter
	export import Find = _find.Find
	export import FindLast = _findLast.FindLast
	export import IndexAt = _indexAt.IndexAt
	export import IsIndexOutOfBound = _isIndexOutOfBound.IsIndexOutOfBound
	export import IsReadonly = _isReadonly.IsReadonly
	export import PadStart = _padStart.PadStart
	export import Reverse = _reverse.Reverse
	export import SplitAt = _splitAt.SplitAt
	export import Some = _some.Some
}
