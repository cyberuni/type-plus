/**
 * 🧰 *namespace*
 *
 * The array types that either clash with a name already on the top-level
 * surface or are too array-specific to sit there: `ArrayPlus.Entries`,
 * `ArrayPlus.CommonPropKeys`, `ArrayPlus.DropMatch`, `ArrayPlus.ElementMatch`,
 * `ArrayPlus.Find`, `ArrayPlus.IndexAt`, `ArrayPlus.IsIndexOutOfBound`,
 * `ArrayPlus.IsReadonly` and `ArrayPlus.SplitAt`.
 *
 * The names it shares with the top-level exports are not aliases.
 * `ArrayPlus.Filter<A, C>` is the array-only implementation; the top-level
 * `Filter<A, C>` dispatches to it or to the tuple one by `A['length']`.
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
export type { Concat } from './array_plus.concat.js'
export type { DropMatch } from './array_plus.drop_match.js'
export type { ElementMatch } from './array_plus.element_match.js'
export type { Filter } from './array_plus.filter.js'
export type { Find } from './array_plus.find.js'
export type { IndexAt } from './array_plus.index_at.js'
export type { IsIndexOutOfBound } from './array_plus.is_index_out_of_bound.js'
export type { IsReadonly } from './array_plus.is_readonly.js'
export type { PadStart } from './array_plus.pad_start.js'
export type { SplitAt } from './array_plus.split_at.js'
