// Original by Klaus Meinhardt @ajafff
// known from Gerrit Birkeland @Gerrit0
// https://github.com/Microsoft/TypeScript/issues/25987#issuecomment-408339599

import type { PrimitiveTypes } from '../primitive.js'

// https://github.com/microsoft/TypeScript/issues/25987#issuecomment-441224690
/**
 * ⚗️ *transform*
 *
 * Intended to select the keys of `T` that are declared explicitly, dropping the
 * ones contributed by a `string` or `number` index signature.
 *
 * ⚠️ It no longer does that. Under every TypeScript version this package
 * supports the body resolves to `never` for every `T`, including records with
 * no index signature at all. The `{} extends U` guard the trick relies on has
 * not held since the compiler changed how homomorphic mapped types are
 * compared. The examples below pin what it actually produces, not what the
 * name suggests.
 *
 * Its own spec passes only vacuously: `never` is assignable to every type, so
 * an `assertType<'a' | 'b'>` check cannot detect the collapse.
 *
 * @example
 * ```ts
 * type R = KnownKeys<{ a: 1; b: 2 }> // never
 * type R = KnownKeys<{ a?: boolean; [k: string]: any }> // never
 * type R = KnownKeys<string> // never
 * ```
 */
export type KnownKeys<T> = T extends PrimitiveTypes
	? never
	: {
				[K in keyof T]: string extends K ? never : number extends K ? never : K
			} extends { [_ in keyof T]: infer U }
		? // eslint-disable-next-line @typescript-eslint/ban-types
			{} extends U
			? never
			: U
		: never
