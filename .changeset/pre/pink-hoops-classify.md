---
'type-plus': patch
---

Classify an intersection of a primitive with a record by its primitive constituent, fixing #429.

`IsStringLiteral`, `IsTemplateLiteral`, and their negations read the kind of a string type through
`` `${T}` ``, and `IsNegative`, `IsPositive`, `IsNotNegative` and `IsNotPositive` read a sign off the
same template. TypeScript 5.1 stopped reducing an intersection inside a template
([microsoft/TypeScript#57918](https://github.com/microsoft/TypeScript/issues/57918), still open), so
`` `${'abc' & { a: 1 }}` `` stayed unresolved and every one of those types answered as though the
string or number were not there:

```ts
type R = IsStringLiteral<'abc' & { a: 1 }, { exact: true }> // was false, now true
type R = IsTemplateLiteral<'abc' & { a: 1 }> // was true, now false
type R = IsNegative<-1 & { a: 1 }> // was false, now true
```

The intersected members are now peeled off before the template is built, using TypeScript's
inference to an intersection target (`T extends infer U & O`) rather than the template reduction TS
withdrew. Both spellings of the members are handled — one record holding several
(`'abc' & { a: 1, b: 2 }`) and several records (`'abc' & { a: 1 } & { b: 2 }`).

Two shapes remain unreduced, both for the same upstream reason: an intersected index signature
(`'abc' & Record<number, unknown>`), whose key is one `String` already declares, and an intersection
nested inside a string manipulation type (`Uppercase<'' & { a: 1 }>`), which never surfaces as a
constituent of the outer type.
