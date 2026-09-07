---
'type-plus': patch
---

Correct the TSDoc for the `string`, `object`, `tuple` and `union` types, and pin every documented
example to the implementation.

Twenty-four documented claims did not match what the types actually resolve to:

- `IsNotString<never>` and `IsNotString<unknown>` were documented as `false`; the special types are
  not strings, so the negation accepts them and both are `true`. `IsNotString<string | 1, {
  distributive: false }>` was documented as `false` and is `true`.
- `IsStringLiteral` and `IsNotStringLiteral` illustrated the `exact` option with `'${number}'`, an
  ordinary string literal, where the template literal `` `${number}` `` was meant.
- `IsObject`'s first example asserted `IsNotObject<object> // true` — the wrong type, and the wrong
  answer for it. The `{ selection: 'filter' }` examples for `IsObject`, `IsNotObject` and
  `IsNotTuple` were missing the option they were demonstrating.
- `DropLast<[1, 2, 3]>` was documented as `[2, 3]`, copied from `DropFirst`; it is `[1, 2]`.
- `IsNotTuple<[] | 1, { distributive: false }>` was documented as `false` and is `true`.
- `TuplePlus.Find<[true, number | string], string>` was documented as `string | undefined`;
  `$unionNotMatch` defaults to `never`, so it is `string`. The example now shows both.
- `TuplePlus.Filter`'s examples were written as bare `Filter`, which resolves to the unrelated
  array `Filter`, and `UnionType`'s examples were written as `IsUnion`.
- The branch examples used names that do not exist — `$IsString.$Branch`, `$IsNotStringLiteral.$Branch`
  and the retired `$SelectionBranch` — and two of them named `IsString` in `IsTemplateLiteral`'s docs.

On the docs site, `$ExtractManipulatedString<Uppercase<'abc'>>` was documented as `'abc'`. The
intrinsic resolves before the type sees it, so the result is `'ABC'`; only an unresolved intrinsic
can be seen through.

`src/string/string_docs.spec.ts`, `src/object/object_docs.spec.ts`, `src/tuple/tuple_docs.spec.ts`
and `src/union/union_docs.spec.ts` now pin every documented example with `testType.equal`, so an
example that drifts from the implementation fails to compile.
