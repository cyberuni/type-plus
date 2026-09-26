---
'type-plus': major
---

Stop exposing implementation helpers as public namespace members.

157 helpers were reachable from the package entry, for example `IsNumber._D`, `IsBigint._SD`,
`IsIntegerLiteral._L`, `IsNever._O`, `Pick._`, `Some._Fn`, `$Fn._Test`, `$StrictOptions._Message`,
`ArrayPlus.IndexAt._`, `TuplePlus.Filter._Fn`, and every `X.$UtilOptions`.
The undocumented `Some.Strict`, `Some.StrictArray`, `Some.StrictTuple`, `Some.Loose`, `Some.LooseArray`
and `Some.LooseTuple` were public too.
They are now unexported module-level types, so they no longer show up in autocomplete and can change
without a breaking release. The public types they back behave the same.

Migration:

- `X._*` and `Some.Strict*`/`Some.Loose*`: use the public type (`IsNumber<T>`, `IsNumber.$<T, $O>`,
  `Some<A, C>`) instead.
- `X.$UtilOptions`: spell out the options it stood for. For `Assignable` and `NotAssignable` that is
  `$Selection.Options & $Distributive.Options`; the predicates that take `exact` add `& $Exact.Options`.
- `$StrictOptions._Message<K, A>`: read the message off the constraint,
  `$StrictOptions<{ [k in K]: unknown }, A>[K]`.
