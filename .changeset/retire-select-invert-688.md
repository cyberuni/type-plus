---
'type-plus': major
---

Remove `$SelectInvert` and `$SelectInvertStrict`, and export `$Void`.

`$SelectInvert` and `$SelectInvertStrict` were an older generation of the options convention.
`IsNotNumeric`, `IsNotFunction` and `IsNotStrictFunction` now build on `$Special` and
`NotAssignable.$`, like the other `IsNot*` predicates. Their results do not change.
`IsNotNumeric.$` and `IsNotFunction.$` are new type utils that skip the special-type checks.
`IsNotNumeric.$Branch` and `IsNotFunction.$Branch` now take an optional `$O`, like their siblings.

**Breaking** only for code that imports `$SelectInvert` or `$SelectInvertStrict`.
Use `NotAssignable.$` inside `$Special` instead, as `IsNotNumeric` does.

`$Void` is now exported. It already appeared in public constraints such as `IsObject.$Options`,
but consumers could not name it.

The docs now agree with the code on the default: `$O` defaults to `{}`, so a plain call such as
`IsObject<T>` returns `true` or `false`. Pass `X.$Branch` when you compose predicates. The
`$Selection` docs no longer call `$Branch` the recommended default. Examples that used the removed
`$SelectionBranch` and `$SelectionPredicate` names now use `X.$Branch` and `$Selection.Branch`.
The `IsAnyOrNever` examples now show its real `true`/`false` results.

Closes [#688](https://github.com/cyberuni/type-plus/issues/688).
