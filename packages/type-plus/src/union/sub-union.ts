/**
 * 🧰 *type util*
 *
 * Defines `T` as a subset of the union type `U`.
 *
 * It resolves to `T`. The constraint `T extends U` is the point: a member that
 * is not in `U` is a compile error, so the subset stays in sync with `U`.
 *
 * @example
 * ```ts
 * type Fruit = 'apple' | 'banana' | 'orange'
 * type R = SubUnion<Fruit, 'apple' | 'banana'> // 'apple' | 'banana'
 * type R = SubUnion<Fruit, 'carrot'> // error: 'carrot' is not in Fruit
 * ```
 */
export type SubUnion<U, T extends U> = T
