/**
 * ⚗️ *transform*
 *
 * Either `A`, `B`, or both: `A | B | (A & B)`.
 *
 * Takes up to four types and yields every non-empty combination of them.
 * Use it to accept any mix of several option groups
 * while each group keeps its own required fields.
 *
 * It composes: `EitherOrBoth<EitherOrBoth<A, B>, C>` equals `EitherOrBoth<A, B, C>`.
 *
 * Overlapping groups can hit corner cases,
 * because a shared key takes the intersection of its types in the `A & B` member.
 *
 * @example
 * ```ts
 * type R = EitherOrBoth<{ a: 1 }, { b: 1 }> // { a: 1 } | { b: 1 } | ({ a: 1 } & { b: 1 })
 * ```
 *
 * @example
 * ```ts
 * type A = { src: string, minify?: boolean }
 * type B = { logLevel: number }
 * function config(options: EitherOrBoth<A, B>) { }
 *
 * config({ logLevel: 1 })
 * config({ src: 'src' })
 * config({ src: 'src', minify: false })
 * config({ minify: false }) // error: `src` is required once `minify` is given
 * ```
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
