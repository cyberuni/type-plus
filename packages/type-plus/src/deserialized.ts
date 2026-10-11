import type { Branded } from './nominal/brand.js'
import type { Serialized } from './serialized.js'

/**
 * 🧰 *type util*
 *
 * The type of the value a {@link Serialized} string holds: what parsing it
 * gives back.
 *
 * Use it as the return type of a parse wrapper, whose parameter is constrained
 * to the format that parser reads:
 *
 * ```ts
 * const parse = <S extends Serialized<any>>(text: S) => JSON.parse(text) as Deserialized<S>
 *
 * const user = parse(stringify({ id: 1 })) // { id: number }
 * parse(flattedText)
 * // Type '"Serialized<circular>"' is not assignable to type '"Serialized<json>"'
 * ```
 *
 * @example
 * ```ts
 * type R = Deserialized<Serialized<{ a: number }>> // { a: number }
 * type R = Deserialized<Serialized<{ a: number }, { circular: true }>> // { a: number }
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Deserialized<S extends Serialized<any, { circular: boolean }>> = S extends Branded<any, infer T> ? T : never
