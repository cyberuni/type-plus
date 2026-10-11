import type { $StrictOptions } from './$type/utils/$strict-options.js'
import type { JsonCompatible } from './json-compatible.js'
import type { Branded } from './nominal/brand.js'

/**
 * 🧰 *type util*
 *
 * A `string` produced by serializing a value of type `T`, carrying `T` with
 * it so the matching parse can give it back. Read it back with
 * {@link Deserialized}.
 *
 * `JSON.parse` returns `any`, and so do serializers built on JSON such as
 * [flatted](https://github.com/WebReflection/flatted). Nothing ties the type
 * of the value you stringify to the value you parse. Cast the result of the
 * stringify to `Serialized<T>` in a two-line wrapper, and the type travels
 * with the string:
 *
 * ```ts
 * const stringify = <T extends JsonCompatible<T>>(value: T) => JSON.stringify(value) as Serialized<T>
 * const parse = <S extends Serialized<any>>(text: S) => JSON.parse(text) as Deserialized<S>
 *
 * const text = stringify({ id: 1, tags: ['a'] }) // Serialized<{ id: number; tags: string[] }>
 * const user = parse(text) // { id: number; tags: string[] }
 * stringify({ createdAt: new Date() })
 * // Type 'Date' is not assignable to type '"not JSON at $.createdAt"'
 * ```
 *
 * It is a branded `string`: assignable to `string`, so it can be sent or
 * stored as one, but a plain `string`, or the serialized form of an unrelated
 * type, is not assignable to it. `T` is constrained with
 * {@link JsonCompatible}, which accepts interfaces and recursive types.
 *
 * Like any type, it is only as true as the cast in the wrapper: it records what
 * the wrapper claims the string holds.
 *
 * @example
 * ```ts
 * type R = Serialized<{ a: number }> extends string ? true : false // true
 * type R = string extends Serialized<{ a: number }> ? true : false // false
 * type R = Serialized<{ a: 1 }> extends Serialized<{ a: number }> ? true : false // true
 * type R = Serialized<{ a: number }> extends Serialized<{ b: number }> ? true : false // false
 * ```
 *
 * 🔢 *customize*
 *
 * `circular: true` tags the string as written by a serializer that keeps
 * circular references, such as flatted. The two formats do not assign to each
 * other either way, so a flatted string cannot reach `JSON.parse` and a plain
 * JSON string cannot reach `flatted.parse`.
 *
 * `circular` names the format, not a property of the value. A type cannot
 * prove a value is acyclic: the default, `circular: false`, means the string
 * is plain JSON, not that the value has no cycles. A cyclic value passed to
 * `JSON.stringify` still throws at runtime. `circular: boolean` is either
 * format.
 *
 * ```ts
 * import * as flatted from 'flatted'
 *
 * const stringify = <T extends JsonCompatible<T>>(value: T) =>
 *   flatted.stringify(value) as Serialized<T, { circular: true }>
 * const parse = <S extends Serialized<any, { circular: true }>>(text: S) => flatted.parse(text) as Deserialized<S>
 * ```
 *
 * @example
 * ```ts
 * type R = Serialized<{ a: number }, { circular: true }> extends Serialized<{ a: number }> ? true : false // false
 * type R = Serialized<{ a: number }> extends Serialized<{ a: number }, { circular: true }> ? true : false // false
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type Serialized<T extends JsonCompatible<T>, $O extends $StrictOptions<$O, Serialized.$Options> = {}> = string &
	Branded<_Format<$O extends { circular: infer C } ? C : Serialized.$Default['circular']>, T>

export namespace Serialized {
	export interface $Options {
		/**
		 * Whether the string is in a format that keeps circular references, such
		 * as flatted's, instead of plain JSON. `false` by default.
		 *
		 * It tags the format only. A type cannot prove a value is acyclic.
		 */
		circular?: boolean | undefined
	}
	export interface $Default {
		circular: false
	}
}

/**
 * The brand name of each format. A `boolean` gives both.
 */
type _Format<C> = C extends true ? 'Serialized<circular>' : 'Serialized<json>'
