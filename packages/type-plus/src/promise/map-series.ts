/**
 * `Array.prototype.map` with an async `fn`, run one at a time.
 *
 * Each call starts only after the previous one resolves, which is the
 * difference from `Promise.all(values.map(fn))`. Use it when the work must not
 * run concurrently, such as a rate-limited API or writes that have to land in
 * order. The results come back in the order of `values`.
 *
 * The chain is not error-tolerant: the first rejection rejects the result and
 * the remaining values are never visited.
 *
 * @example
 * ```ts
 * const r = await mapSeries([1, 2, 3], async (v) => v * 2)
 * // r === [2, 4, 6]
 * // typeof r === number[]
 *
 * const r = await mapSeries([], async (v: number) => v)
 * // r === []
 * ```
 */
export function mapSeries<R, T = any>(values: T[], fn: (value: T) => Promise<R>): Promise<R[]> {
	return values.reduce((p, v) => p.then((r) => fn(v).then((v) => (r.push(v), r))), Promise.resolve<R[]>([]))
}
