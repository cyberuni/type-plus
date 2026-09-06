declare const uniSym: unique symbol

/**
 * A failed type carrying a message, analogous to the `Error` class in
 * JavaScript. Type-level code returns it to report why a computation could not
 * proceed.
 *
 * To attach a type alongside the message, use `FailedT`, or -- better -- define
 * your own failed type so the message can be specific.
 *
 * @deprecated **💀 deprecated since 8.0.0**: use `$Error` instead.
 *
 * @example
 * ```ts
 * type R = Failed<'error message'>
 * ```
 */
export interface Failed<Msg extends string> {
	[uniSym]: Msg
}

/**
 * A failed type carrying a message and one additional type.
 *
 * The extra type parameter is phantom: it is not part of the interface's
 * members, so two `FailedT` with the same message and different types are the
 * same type. Defining a custom failed type gives a better message than
 * threading a type through this one.
 *
 * @deprecated **💀 deprecated since 8.0.0**: use `$Error` instead.
 *
 * @example
 * ```ts
 * type R = FailedT<'missing', number | string>
 * ```
 */
export interface FailedT<Msg extends string, _T> {
	[uniSym]: Msg
}
