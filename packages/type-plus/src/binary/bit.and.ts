import type { Bit } from './bit.bit.js'

/**
 * Bitwise AND operation.
 *
 * @since 🏷️ 8.0.0
 */
export type And<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 1 : 0) : 0
