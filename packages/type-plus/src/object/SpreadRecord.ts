import type { Omit } from '../object/index.js'

/**
 * ⚗️ *transform*
 *
 * The type of `{ ...a, ...b }`: the properties of `A` that `B` does not
 * redeclare, intersected with all of `B`. On a collision `B` wins.
 *
 * The result is an intersection rather than a flattened object literal.
 *
 * For a version that also reconciles optionality and `Record` shapes, see
 * `ObjectPlus.Merge`.
 *
 * @example
 * ```ts
 * type R = SpreadRecord<{ a: number; b: string }, { b: boolean; c: number }>
 * // { a: number } & { b: boolean; c: number }
 * // resolved: { a: number; b: boolean; c: number }
 * ```
 */
export type SpreadRecord<A extends Record<any, any>, B extends Record<any, any>> = Omit<A, Extract<keyof A, keyof B>> &
	B
