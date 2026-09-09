/**
 * 🧰 *namespace*
 *
 * Bitwise operations on a single bit, exported under two names: `B` and `Bit`.
 * Both are the same namespace, so `B.And` and `Bit.And` are one type; pick
 * whichever reads better at the call site.
 *
 * It holds `Not`, `And`, `Or` and `Xor` over `Bit` (`0 | 1`), plus the `Bit`
 * type itself as `B.Bit`. They are the `logical` operators with `0 | 1` in
 * place of `true | false`, for the type-level code that carries a flag as a
 * digit. Unlike the boolean ones they take no options: they are building
 * blocks, with no branches to override.
 *
 * @example
 * ```ts
 * type R = B.And<1, 1> // 1
 * type R = Bit.Or<0, 1> // 1
 * type R = B.Not<0> // 1
 * type R = Bit.Xor<1, 1> // 0
 * ```
 *
 * @since 🏷️ 8.0.0
 */

/**
 * 🧰 *type util*
 *
 * A single bit: `0` or `1`.
 *
 * @example
 * ```ts
 * type R = B.Bit // 0 | 1
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Bit = 0 | 1

/**
 * Bitwise NOT operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Not<X extends Bit> = X extends 0 ? 1 : 0

/**
 * Bitwise AND operation.
 *
 * @since 🏷️ 8.0.0
 */
export type And<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 1 : 0) : 0

/**
 * Bitwise OR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Or<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0

/**
 * Bitwise XOR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Xor<A extends Bit, B extends Bit> = A extends 1 ? Not<B> : B
