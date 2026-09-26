/**
 * Pad `A` with `PadWith` at the start of the tuple.
 *
 * If the `MaxLength` is less than the length of the tuple,
 * `A` is returned unchanged.
 *
 * ⚗️ *transform*
 *
 * @example
 * ```ts
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Ignore if MaxLength is less than the length of the tuple
 * PadStart<[1, 2, 3], 2> // [1, 2, 3]
 *
 * // Default to unknown
 * PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
 * ```
 */
export type PadStart<A extends readonly unknown[], MaxLength extends number, PadWith = unknown> = PadStart.Device<
	A,
	MaxLength,
	PadWith,
	[]
>

export namespace PadStart {
	export type Device<
		Source extends readonly unknown[],
		MaxLength extends number,
		PadWith,
		Result extends unknown[],
	> = Result['length'] extends MaxLength
		? Source extends []
			? Result
			: Source extends readonly [...infer Head, infer Tail]
				? [Tail, ...Result] extends infer R extends unknown[]
					? Device<Head, R['length'], PadWith, R>
					: never
				: never
		: Source extends []
			? Device<Source, MaxLength, PadWith, [PadWith, ...Result]>
			: Source extends readonly [...infer Head, infer Tail]
				? Device<Head, MaxLength, PadWith, [Tail, ...Result]>
				: Source
}
