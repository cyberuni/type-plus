import type { JsonPrimitive, JsonTypes } from './json.js'

/**
 * 🧰 *type util*
 *
 * `T` with every part that does not survive a JSON round trip replaced by a
 * message naming where it is. Use it as a self-referencing constraint,
 * `T extends JsonCompatible<T>`, to accept a JSON-safe value of any declared
 * type, including an `interface`.
 *
 * `JsonTypes` cannot do this: TypeScript gives an interface no implicit index
 * signature, so `interface User { id: number }` is never assignable to it.
 * `JsonCompatible<T>` is built from `T`'s own keys instead, so it has no index
 * signature to satisfy.
 *
 * It accepts what `JsonTypes` accepts, plus interfaces, readonly arrays and
 * tuples, and optional properties. It rejects functions, objects with methods
 * (such as `Date` and `Map`), `bigint`, `symbol`, and `undefined` anywhere but
 * the implicit value of an optional property.
 *
 * A rejected part is replaced by the string literal `` `not JSON at ${path}` ``,
 * where `path` is a JSONPath from the root `$`, so the compiler error names
 * where the problem is: `Type 'Date' is not assignable to type
 * '"not JSON at $.profile.createdAt"'`. Array elements show as `[*]` and tuple
 * elements by index.
 *
 * @example
 * ```ts
 * function save<T extends JsonCompatible<T>>(value: T) { ... }
 *
 * interface User { id: number; tags: string[]; nick?: string }
 * declare const user: User
 * save(user) // ok
 * save({ a: [1, 2] } as const) // ok
 *
 * interface Post { createdAt: Date }
 * declare const post: Post
 * save(post) // Type 'Date' is not assignable to type '"not JSON at $.createdAt"'
 * save({ a: undefined }) // Type 'undefined' is not assignable to type '"not JSON at $.a"'
 * ```
 *
 * @example
 * ```ts
 * type R = { a: 1 } extends JsonCompatible<{ a: 1 }> ? true : false // true
 * type R = JsonCompatible<{ a: { b: Date } }>['a'] // { b: 'not JSON at $.a.b' }
 * type R = JsonCompatible<{ a: Array<() => void> }>['a'] // Array<'not JSON at $.a[*]'>
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type JsonCompatible<T> = _JsonMap<T, '$'> & (JsonPrimitive | (object & { [Symbol.hasInstance]?: never }))

type _AnyFunction = (...args: any[]) => any

/**
 * `T`'s keys, each holding its value checked at the path below `P`.
 *
 * A homomorphic mapped type keeps `T`'s optional and readonly modifiers, keeps
 * an array an array, and maps a primitive to itself.
 */
type _JsonMap<T, P extends string> = {
	[K in keyof T]: _JsonCheck<T[K], `${P}${_JsonSegment<K, T extends readonly unknown[] ? true : false>}`>
}

type _JsonSegment<K, InArray> = InArray extends true
	? number extends K
		? '[*]'
		: `[${K & (string | number)}]`
	: `.${K & (string | number)}`

/**
 * `T` itself when it is already JSON, which also stops the recursion on
 * `JsonTypes`; otherwise the check of each part of `T`.
 */
type _JsonCheck<T, P extends string> = T extends JsonTypes
	? T
	: T extends _AnyFunction
		? _JsonFail<P>
		: T extends readonly unknown[]
			? _JsonMap<T, P>
			: T extends object
				? true extends { [K in keyof T]-?: T[K] extends _AnyFunction ? true : false }[keyof T]
					? _JsonFail<P>
					: _JsonMap<T, P>
				: _JsonFail<P>

type _JsonFail<P extends string> = `not JSON at ${P}`
