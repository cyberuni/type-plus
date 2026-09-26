import type { Bit } from './bit.bit.js'

/**
 * Bitwise NOT operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Not<X extends Bit> = X extends 0 ? 1 : 0
