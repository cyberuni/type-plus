/**
 * Converts a number or bigint `N` to negative.
 * If `N` is already negative, it returns itself.
 *
 * @example
 * ```ts
 * ToNegative<5> // -5
 * ToNegative<0> // 0
 * ToNegative<-5> // -5
 * ```
 */
export type ToNegative<N extends number | bigint> = N extends number
	? N extends 0
		? 0
		: `-${N}` extends `${infer W extends number}`
			? W
			: N
	: N extends 0n
		? 0n
		: `-${N}` extends `${infer W extends bigint}`
			? W
			: N
