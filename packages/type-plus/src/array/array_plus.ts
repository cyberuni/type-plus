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

export type { At } from './array.at.js'
export type { Entries } from './array.entries.js'
export type { FindLast } from './array.find_last.js'
export type { Reverse } from './array.reverse.js'
export type { Some } from './array.some.js'
export type { CommonPropKeys } from './array_plus.common_prop_keys.js'
export type { DropMatch } from './array_plus.drop_match.js'
export type { ElementMatch } from './array_plus.element_match.js'
export type { Filter } from './array_plus.filter.js'
export type { Find } from './array_plus.find.js'
export type { IndexAt } from './array_plus.index_at.js'
export type { IsIndexOutOfBound } from './array_plus.is_index_out_of_bound.js'
export type { IsReadonly } from './array_plus.is_readonly.js'
export type { PadStart } from './array_plus.pad_start.js'
export type { SplitAt } from './array_plus.split_at.js'
