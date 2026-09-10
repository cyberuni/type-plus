/**
 * 🧰 *namespace*
 * ㊙️ *internal*
 *
 * The building blocks the `$Options` type parameters are assembled from:
 * `TypePlusOptions.Merge`, which fills a caller's options in from the defaults,
 * and `TypePlusOptions.NotArray`, the `$notArray` branch the array types share.
 *
 * These are the machinery behind the options convention, not part of it. A
 * caller passes an options object; only a type implementing one needs these.
 *
 * @example
 * ```ts
 * type R = TypePlusOptions.Merge<{ a: 1 }, { a: 0; b: 0 }> // { a: 1; b: 0 }
 * ```
 */
export namespace TypePlusOptions {
	/**
	 * 🦴 *utilities*
	 * ㊙️ *internal*
	 *
	 * Merge the input Options `I` with the default Options `D`.
	 */
	export type Merge<I, D> = {
		[k in keyof D]: k extends keyof I ? I[k] : D[k]
	}

	export interface NotArray {
		$notArray?: unknown
	}
}
