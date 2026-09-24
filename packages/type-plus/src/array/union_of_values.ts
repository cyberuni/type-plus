/**
 * ⚗️ *transform*
 *
 * Gets the union of the element types of the array or tuple `A`.
 *
 * @example
 * ```ts
 * type R = UnionOfValues<Array<string | number>> // string | number
 * type R = UnionOfValues<['a', 1, true]> // 'a' | 1 | true
 * type R = UnionOfValues<readonly [string, boolean]> // string | boolean
 * ```
 */
export type UnionOfValues<A extends readonly unknown[]> = A extends Readonly<Array<infer E>> ? E : never

// alternative implementation
// export type UnionOfValues<A extends readonly any[]> = (A)[number]
// from: https://twitter.com/anveio/status/1615140804816928769?s=20&t=wrudiqV94A11CSl19N6Viw
