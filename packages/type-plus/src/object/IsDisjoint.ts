import type { And, Not } from '../predicates/index.js'
import type { AnyRecord } from './any_record.js'
import type { HasKey } from './hasKey.js'

/**
 * 🎭 *predicate*
 *
 * Validate if the two records are disjoint from each other.
 * Disjoint means no common property.
 *
 * Note that this is a plain composition of `And`, `Not` and `HasKey` rather
 * than one of the `$Options` predicates: it takes no options, and it does not
 * special-case `any`, `never` or `unknown`.
 *
 * @example
 * ```ts
 * type R = IsDisjoint<{ a: 1 }, { b: 1 }> // true
 * type R = IsDisjoint<{ a: 1 }, { a: 2; b: 1 }> // false
 * ```
 */
export type IsDisjoint<A extends AnyRecord, B extends AnyRecord> = And<Not<HasKey<A, keyof B>>, Not<HasKey<B, keyof A>>>
