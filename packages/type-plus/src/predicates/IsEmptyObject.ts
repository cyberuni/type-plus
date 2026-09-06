/* eslint-disable @typescript-eslint/ban-types */
/**
 * 🎭 *predicate*
 *
 * Validate if `T` is the empty object type `{}`, i.e. a type that both extends
 * `{}` and is extended by it.
 *
 * ⚠️ `{}` in TypeScript means "anything but `null` and `undefined`", not "an
 * object with no properties", so this is broader than the name suggests:
 * `object` and `Record<string, never>` both pass. Primitives do not, because
 * `{} extends number` is false.
 *
 * It is a plain `extends` check with no `$Options` support, and it does not
 * special-case the special types: `never` gives `never`.
 *
 * @example
 * ```ts
 * type R = IsEmptyObject<{}> // true
 * type R = IsEmptyObject<object> // true
 * type R = IsEmptyObject<Record<string, never>> // true
 *
 * type R = IsEmptyObject<{ a: 1 }> // false
 * type R = IsEmptyObject<number> // false
 *
 * type R = IsEmptyObject<never> // never
 * ```
 */
export type IsEmptyObject<T> = T extends {} ? ({} extends T ? true : false) : false
