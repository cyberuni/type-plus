import type { _FnTest } from './_fn_test.js'

/**
 * 🧰 *type util*
 *
 * A type function: a type that computes its `out` from its `in`.
 *
 * TypeScript has no higher-kinded types, so a generic type such as `IsObject`
 * cannot be passed to another type unapplied.
 * A `$Fn` stands in for one: an interface whose `out` reads `this['in']`.
 * `$Fn.Apply` intersects the function with an `in`, and `this` then refers to the intersection,
 * so `out` computes from that input.
 *
 * The `'~type-plus/fn'` brand is what marks a type as a function.
 * A user type that merely has `in` and `out` properties is not a `$Fn`,
 * so the collection types still match it with `extends`.
 *
 * A predicate that can be passed as a function exposes a `$Fn` in its namespace.
 * Its type parameters are the predicate's options, so `IsObject.$Fn<{ exact: true }>` is
 * `IsObject` partially applied.
 * `Filter`, `Find`, `Some` and `DropMatch` accept either a plain type, matched with `extends`,
 * or a `$Fn`, which matches when it returns `true`.
 *
 * @example
 * ```ts
 * interface IsOne extends $Fn {
 *   readonly out: this['in'] extends 1 ? true : false
 * }
 *
 * type R = $Fn.Apply<IsOne, 1> // true
 * type R = $Fn.Apply<IsOne, 2> // false
 *
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], object> // [{ a: 1 }, object]
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>> // [object]
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], $Fn.Not<IsObject.$Fn>> // [1, 'x']
 * ```
 *
 * @since 8.0.0
 */
export interface $Fn {
	readonly '~type-plus/fn': true
	readonly in: unknown
	readonly out: unknown
}

export namespace $Fn {
	/**
	 * 🧰 *type util*
	 *
	 * Call the type function `F` with the input `A`.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsObject.$Fn, {}> // true
	 * type R = $Fn.Apply<IsObject.$Fn<{ exact: true }>, {}> // false
	 * ```
	 */
	export type Apply<F extends $Fn, A> = (F & { readonly in: A })['out']

	/**
	 * 🧰 *type util*
	 *
	 * Negate the predicate function `F`.
	 *
	 * A `boolean` answer, as a distributive predicate gives for a mixed union, stays `boolean`.
	 *
	 * To negate a predicate that has an `IsNot` counterpart, prefer that counterpart:
	 * `$Selection.Flip` derives it for less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<$Fn.Not<IsObject.$Fn>, {}> // false
	 * type R = $Fn.Apply<$Fn.Not<IsObject.$Fn>, 1> // true
	 * type R = $Fn.Apply<$Fn.Not<IsObject.$Fn>, {} | 1> // boolean
	 * ```
	 */
	export interface Not<F extends $Fn> extends $Fn {
		readonly out: Apply<F, this['in']> extends infer R ? (R extends true ? false : true) : never
	}

	/**
	 * 🧰 *type util*
	 *
	 * Whether `T` matches `Criteria`, for a type that accepts either kind of criteria.
	 *
	 * A `$Fn` matches when it returns exactly `true`:
	 * `boolean` (a mixed union) and `never` do not match.
	 * Any other type matches when `T extends Criteria`, without distributing over `T` or `Criteria`.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Match<{}, object> // true
	 * type R = $Fn.Match<{}, IsObject.$Fn<{ exact: true }>> // false
	 * type R = $Fn.Match<{} | 1, IsObject.$Fn> // false
	 * ```
	 */
	export type Match<T, Criteria> = [Criteria] extends [never]
		? [T] extends [never]
			? true
			: false
		: [Criteria] extends [infer F extends $Fn]
			? _FnTest<T, F>
			: [T] extends [Criteria]
				? true
				: false
}
