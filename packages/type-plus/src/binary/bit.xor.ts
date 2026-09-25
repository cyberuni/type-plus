import type { Bit } from './bit.bit.js'
import type { Not } from './bit.not.js'

/**
 * Bitwise XOR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Xor<A extends Bit, B extends Bit> = A extends 1 ? Not<B> : B
