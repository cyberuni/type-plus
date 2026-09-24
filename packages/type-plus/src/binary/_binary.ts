import * as _bit from './bit.js'

export * as Bit from './bit.js'

/**
 * 🧰 *namespace*
 *
 * The same namespace as `Bit`, under a one-letter name.
 *
 * @deprecated Use `Bit`. `B` is the name type parameters are most often given
 * (`And<A, B>`), so a type parameter `B` shadows the namespace inside any
 * generic that declares one. `B` will be removed in a future major.
 *
 * @example
 * ```ts
 * type R = B.And<1, 1> // 1, same as Bit.And<1, 1>
 * ```
 */
export import B = _bit
