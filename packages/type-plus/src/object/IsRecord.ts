/**
 * 🎭 *predicate*
 *
 * Validate if `T` is a record, i.e. assignable to `Record<any, any>` and not an
 * array.
 *
 * Note that this is a plain `extends` check rather than one of the `$Options`
 * predicates: it takes no options, and it does not special-case `any`,
 * `never` or `unknown`.
 *
 * @example
 * ```ts
 * type R = IsRecord<{ a: 1 }> // true
 * type R = IsRecord<Record<string, number>> // true
 *
 * type R = IsRecord<number[]> // false
 * type R = IsRecord<string> // false
 * ```
 */
export type IsRecord<T> = T extends any[] ? false : T extends Record<any, any> ? true : false
