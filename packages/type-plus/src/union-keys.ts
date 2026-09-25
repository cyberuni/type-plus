/**
 * 🦴 *utilities*
 *
 * Gets the keys of every member of the union `T`.
 *
 * `keyof` on a union gets only the keys that all of its members share.
 * `UnionKeys<T>` distributes over the union and collects the keys of each
 * member instead, which is what a type that distributes over `T` can accept.
 *
 * @example
 * ```ts
 * type R = UnionKeys<{ a: 1 } | { b: 2 }> // 'a' | 'b'
 * type R = keyof ({ a: 1 } | { b: 2 }) // never
 * ```
 */
export type UnionKeys<T> = keyof T | (T extends unknown ? keyof T : never)
