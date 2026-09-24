import type { AnyRecord } from './any_record.js'
import type { OptionalKeys } from './optional_key.js'
import type { RequiredKeys } from './RequiredKeys.js'

/**
 * ⚗️ *transform*
 *
 * Adjust `T` to work with compiler flag [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes).
 *
 * It adds `undefined` to optional properties, so they accept an explicit
 * `undefined` under the flag. Required properties are kept as declared.
 * It distributes over a union `T`.
 *
 * @example
 * ```ts
 * type R = AdjustExactOptionalProps<{ a: string; b?: string }>
 * // { a: string; b?: string | undefined }
 * ```
 */
export type AdjustExactOptionalProps<T extends AnyRecord> = T extends object
	? [{ [K in OptionalKeys<T>]?: T[K] | undefined }, { [K in RequiredKeys<T>]: T[K] }] extends [
			infer O extends AnyRecord,
			infer R extends AnyRecord,
		]
		? keyof O extends never
			? R
			: keyof R extends never
				? O
				: O & R
		: never
	: never
