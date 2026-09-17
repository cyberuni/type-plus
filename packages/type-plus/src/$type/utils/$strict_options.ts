/**
 * 🧰 *type util*
 *
 * A string literal type carrying an error message, for a constraint to report through.
 *
 * The message ends with an invisible zero-width space (`U+200B`),
 * so no value, including the message text itself, satisfies it by accident.
 * TypeScript prints the message as the type the offending value is not assignable to.
 *
 * The technique is ArkType's `ErrorMessage`.
 *
 * @example
 * ```ts
 * type R = $ErrorMessage<'not a valid option'> // 'not a valid option\u200b'
 * ```
 */
export type $ErrorMessage<M extends string> = `${M}\u200b`

/**
 * 🧰 *type util*
 *
 * Constrain options `$O` to the keys of the options type `A`.
 *
 * A type parameter constraint does not reject unknown keys:
 * `{ exactt: true; distributive: false }` satisfies `IsObject.$Options`
 * because TypeScript checks excess properties only on object literal values, never on type arguments.
 * Referencing `$O` in its own constraint maps each unknown key to an `$ErrorMessage`,
 * so the error names the key and, when a valid key starts with it or it starts with a valid key, suggests that key.
 *
 * ```ts
 * type IsObject<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = ...
 *
 * type R = IsObject<{}, { distributive: false; exactt: true }>
 * // error TS2344: ... Types of property 'exactt' are incompatible.
 * //   Type 'true' is not assignable to type '"'exactt' is not a valid option. Did you mean 'exact'?"'.
 * ```
 *
 * A non-object `$O` (`IsObject<T, string>`) is checked against `A` alone,
 * so the error reads `Type 'string' has no properties in common with type '$Options'`
 * instead of listing every member of `string` as an unknown key.
 *
 * The message does not name the type being checked.
 * Two types with the same options type therefore have the same constraint,
 * which is what lets a generic wrapper with the same constraint forward `$O` unchanged.
 *
 * A generic `$O` constrained only by `A` does not satisfy `$StrictOptions<$O, A>`:
 * an object type is open, so TypeScript cannot rule out extra keys.
 * A generic wrapper either repeats the strict constraint, or forwards its options through `$ForwardOptions`.
 *
 * @example
 * ```ts
 * type R = $StrictOptions._Message<'exactt', IsObject.$Options> // "'exactt' is not a valid option. Did you mean 'exact'?\u200b"
 * type R = $StrictOptions._Message<'$thn', IsObject.$Options> // "'$thn' is not a valid option\u200b"
 * ```
 */
export type $StrictOptions<$O, A> = A &
	([$O] extends [object]
		? {
				[K in Exclude<keyof $O, keyof A>]: $StrictOptions._Message<K, A>
			}
		: unknown)

export namespace $StrictOptions {
	/**
	 * The keys of `A` that start with `K`, or that `K` starts with.
	 *
	 * A prefix match catches a truncated or extended key (`distrib`, `exactt`) at little cost.
	 * It does not catch a changed letter (`$thn`): edit distance at the type level costs far more.
	 */
	export type _Suggest<K, A> = {
		[P in keyof A]-?: P extends string
			? K extends `${P}${string}`
				? P
				: P extends `${K & string}${string}`
					? P
					: never
			: never
	}[keyof A]

	/**
	 * The error message for the unknown key `K`.
	 */
	export type _Message<K, A> = [_Suggest<K, A>] extends [never]
		? $ErrorMessage<`'${K & string}' is not a valid option`>
		: $ErrorMessage<`'${K & string}' is not a valid option. Did you mean '${_Suggest<K, A> & string}'?`>
}

/**
 * 🧰 *type util*
 *
 * Narrow a generic wrapper's options `$O` to the options `A` of the type it forwards them to.
 *
 * It keeps the keys of `$O` that are also keys of `A`, minus `K`,
 * and drops everything else, including the wrapper's own options.
 * The result satisfies `$StrictOptions<..., A>` even while `$O` is generic,
 * so the wrapper can pass it straight on.
 *
 * `K` removes a wrapper's own option that shares a name with a key of `A`,
 * when the wrapper uses it for something else and must not forward it.
 *
 * Constrain the wrapper's own `$O` with `$StrictOptions` too:
 * the options dropped here are otherwise dropped silently, typos included.
 *
 * ```ts
 * interface IsNonEmptyObject$Options extends IsObject.$Options {
 *   nonEmpty?: boolean
 * }
 *
 * type IsNonEmptyObject<T, $O extends $StrictOptions<$O, IsNonEmptyObject$Options> = {}> =
 *   $O['nonEmpty'] extends true
 *     ? keyof T extends never ? false : IsObject<T, $ForwardOptions<$O, IsObject.$Options>>
 *     : IsObject<T, $ForwardOptions<$O, IsObject.$Options>>
 * ```
 *
 * Narrowing with a conditional instead, without removing the wrapper's own options,
 * compiles but answers `never` whenever an own option is passed:
 *
 * ```ts
 * // `nonEmpty` is not a key of `IsObject.$Options`, so the condition fails and the type is `never`.
 * $O extends $StrictOptions<$O, IsObject.$Options> ? IsObject<T, $O> : never
 * ```
 *
 * @example
 * ```ts
 * type R = $ForwardOptions<{ nonEmpty: true; exact: true }, IsObject.$Options> // { exact: true }
 * type R = $ForwardOptions<{ selection: 'filter'; exact: true }, IsObject.$Options, 'selection'> // { exact: true }
 * type R = $ForwardOptions<{}, IsObject.$Options> // {}
 * ```
 */
export type $ForwardOptions<$O, A, K extends PropertyKey = never> = Pick<$O, Exclude<Extract<keyof $O, keyof A>, K>>
