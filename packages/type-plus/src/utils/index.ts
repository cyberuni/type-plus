export * from './as.js'
export * from './inspect.js'
export type { Widen } from './Widen.js'

/**
 * `A` | `B` | `A & B`.
 * Supports up to 4 types, and it is composable.
 * This is useful when you want to compose multiple options together,
 * while preserving their required field and structure.
 * If the types overlaps each other, you may run into some corner cases.
 * But in general usage it should work as expected.
 * @example
 * type A = { src: string, minify?: boolean }
 * type B = { logLevel: number }
 * function config(options: EitherOrBoth<A, B>) { }
 *
 * config({ logLevel: 1 })
 * config({ src: 'src' })
 * config({ src: 'src', minify: false })
 * config({ minify: false })  // INVALID
 */
export type EitherOrBoth<A, B, C = void, D = void> = C extends void
	? A | B | (A & B)
	: D extends void
		? A | B | C | (A & B) | (A & C) | (B & C) | (A & B & C)
		:
				| A
				| B
				| C
				| D
				| (A & B)
				| (A & C)
				| (A & D)
				| (B & C)
				| (B & D)
				| (C & D)
				| (A & B & C)
				| (A & B & D)
				| (A & C & D)
				| (B & C & D)
				| (A & B & C & D)

/**
 * `A` | `B` | `A & B`.
 * Supports up to 4 types, and it is composable.
 * This is useful when you want to compose multiple options together,
 * while preserving their required field and structure.
 * If the types overlaps each other, you may run into some corner cases.
 * But in general usage it should work as expected.
 * @deprecated renamed to `EitherOrBoth`
 * @example
 * type A = { src: string, minify?: boolean }
 * type B = { logLevel: number }
 * function config(options: EitherAnd<A, B>) { }
 *
 * config({ logLevel: 1 })
 * config({ src: 'src' })
 * config({ src: 'src', minify: false })
 * config({ minify: false })  // INVALID
 */
export type EitherAnd<A, B, C = void, D = void> = EitherOrBoth<A, B, C, D>
