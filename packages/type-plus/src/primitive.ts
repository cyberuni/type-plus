/**
 * 🧰 *type util*
 *
 * Every type built into the language:
 * `boolean`, `number`, `string`, `object`, `symbol`, `bigint`, `Function`, `undefined` and `null`.
 *
 * Unlike the JavaScript notion of a primitive, it includes `object` and `Function`,
 * so any object type is assignable to it.
 *
 * @example
 * ```ts
 * type R = 1 extends PrimitiveTypes ? true : false // true
 * type R = { a: 1 } extends PrimitiveTypes ? true : false // true
 * type R = unknown extends PrimitiveTypes ? true : false // false
 * ```
 */
export type PrimitiveTypes = boolean | number | string | object | symbol | bigint | Function | undefined | null
