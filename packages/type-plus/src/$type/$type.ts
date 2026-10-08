/**
 * A branded type to define unique types for type-level programming.
 *
 * It supports all primitive types and object types.
 *
 * When using object types, the type intersect with the specified type to give easy access to its properties.
 *
 * Internally, it uses the properties `_$type` and `_$value` to store the type and value.
 * The type you provide should avoid specifying these properties.
 *
 * If needed, use `$O: { bare: true }` to avoid the intersection.
 *
 * @type V value
 * @type $O options
 *
 * @since 🏷️ 8.0.0
 */
export type $Type<T extends string, V = unknown, $O extends { bare: true } | unknown = unknown> = $O extends {
	bare: true
}
	? $Type.$<T, V>
	: [V] extends [null] | [undefined] | [symbol] | [void]
		? $Type.$<T, V>
		: $Type.$<T, V> & V

declare const _$type: '_$type'
declare const _$value: '_$value'

export namespace $Type {
	export type $TypeKey = '_$type'
	export type $ValueKey = '_$value'

	export type $<T extends string, V = unknown> = {
		[_$type]: T
		[_$value]: V
	}
}
