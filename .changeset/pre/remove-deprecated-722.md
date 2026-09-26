---
'type-plus': major
---

Remove the deprecated exports before 8.0 GA (#722).

**Breaking.** Each name below is gone from the package. Replace it as shown:

| Removed | Replacement |
| --- | --- |
| `Concat<A, B>`, `ArrayPlus.Concat<A, B>` | the spread tuple `[...A, ...B]` |
| `KeepMatch<A, C>` | `Filter<A, C>` |
| `MapToProp<A, P>` | `IntersectOfProps<A, P>` |
| `PropUnion<A, P>` | `UnionOfProps<A, P>` |
| `PartialExcept<T, U>` | `PartialOmit<T, U>` |
| `Except<T, K>` | `Omit<T, K>` |
| `KeysOfOptional<T>` | `OptionalKeys<T>` for the optional keys, `keyof T` for the key union |
| `PromiseValue<P>` | the built-in `Awaited<P>` |
| `EitherAnd<A, B, C, D>` | `EitherOrBoth<A, B, C, D>` |
| `NoInfer<T>` | TypeScript's built-in `NoInfer<T>` (TS 5.4+) |
| `Failed<Msg>`, `FailedT<Msg, T>` | `$Error<Msg>` |
| `B` namespace | `Bit` (`B.And` → `Bit.And`) |
| `NumberPlus` namespace | `NumericPlus`, plus the top-level `IsNumber` and `IsNotNumber` |
| `reduceKey()` | `reduceByKey()` |
| `unpartial()` | import `unpartial` from the `unpartial` package |
| `assertType()` and its members | `testType` for type-level checks, `x satisfies T` for compile-time assignability, `isType()` or a type guard for runtime narrowing |
| `isConstructor()` | none; it passed any function callable with `new` |
| `drop()` | none; the `DropMatch` type stays |

`testType.Failed` is a different type and stays.

`required()` and `requiredDeep()`, also re-exported from the `unpartial` package, stay. They now have
TSDoc and a spec: `required()` merges shallowly and lets a later `undefined` overwrite, while
`requiredDeep()` merges nested objects and keeps the earlier value over a later `undefined`.
