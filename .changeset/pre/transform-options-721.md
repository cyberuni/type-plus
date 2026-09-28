---
'type-plus': major
---

Give the transforms the options convention the predicates use.

Every transform that took options or a positional fallback now takes one last type parameter
`$O extends $StrictOptions<$O, X.$Options> = {}`.
Its namespace declares the keys in `X.$Options` and their defaults in `X.$Default`,
and an unknown key is an error that names the key.
A `$`-prefixed key names what the type returns in one case.
The convention is written up in the [Options reference](https://cyberuni.github.io/type-plus/reference/options/).

Migration:

| Before | After |
| --- | --- |
| `Head<T, { caseEmptyTuple: X }>`, same for `Last`, `DropFirst`, `DropLast` | `Head<T, { $emptyTuple: X }>` |
| `IndexAt<A, N, { caseEmptyTuple, caseUpperBound, caseLowerBound }>` | `IndexAt<A, N, { $emptyTuple, $upperBound, $lowerBound }>` |
| `Add<A, B, Fail>`, and the same third parameter on `Subtract`, `Multiply`, `GreaterThan`, `Max` | `Add<A, B, { $fail: Fail }>` |
| `Abs<N, Fail>`, `StringToNumber<S, Fail>`, `StringToBigint<S, Fail>`, `StringToNumeric<S, Fail>` | `Abs<N, { $fail: Fail }>` |
| `At<A, N, Fail>`, `ArrayPlus.At<A, N, Fail>` | `At<A, N, { $fail: Fail }>` |
| `CreateTuple<L, T, Fail>` | `CreateTuple<L, T, { $fail: Fail }>` |
| `Exclude<T, U, R>` | `Exclude<T, U, { $excluded: R }>` |
| `NotUnknownOr<T, Else>` | `NotUnknownOr<T, { $unknown: Else }>` |
| `ObjectPlus.Merge<A, B, Options>` | `ObjectPlus.Merge<A, B>`; the parameter was never honored |
| `TypePlusOptions.NotArray` | removed; declare `$notArray?: unknown` on your own `$Options` |
| `X.Options`, `X.DefaultOptions` on `Head`, `Last`, `FindFirst`, `DropFirst`, `DropLast`, `CommonPropKeys` (top-level, `ArrayPlus`, `TuplePlus`), `Box`, `ArrayPlus.Find`, `ArrayPlus.Filter`, `ArrayPlus.IndexAt`, `ArrayPlus.ElementMatch`, `TuplePlus.Find` | `X.$Options`, `X.$Default` |

The `$never`, `$array`, `$tuple`, `$notArray`, `$notBoxable`, `$notMatch`, `$widen`, `$unionNotMatch` and `widen` keys keep their names.

`StringIncludes` keeps its positional `Then` and `Else`; `StringPlus.Includes` is the one with options.

Two fixes ride along:
the top-level `CommonPropKeys` now honors `$never` for an array input, and
`StringToNumber` passes `$fail` through when it strips trailing zeros.

A new `$Fail` namespace (`$Fail.$Options`, `$Fail.$Default`) gives a custom transform the `$fail` key.
