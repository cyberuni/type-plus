import type { Bit } from './bit.bit.js'

/**
 * Bitwise OR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Or<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0
