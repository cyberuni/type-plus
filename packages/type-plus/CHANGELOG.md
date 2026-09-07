# type-plus

## 8.0.0-beta.12

### Major Changes

- 1069119: Remove the types and functions deprecated in v7.
  
  | Removed | Replacement |
  | --- | --- |
  | `First` | `FindFirst`, `ArrayPlus.Find` |
  | `isType.t()` | `isType()`, `testType.true()` |
  | `isType.f()` | `isType()`, `testType.false()` |
  | `isType.never()` | `isType()`, `testType.never()` |
  | `isType.equal()` | `testType.equal()` |
  | `CommonKeys` | `CommonPropKeys` |
  | `PadLeft` | `PadStart` |
  
  `isType()` itself is unchanged — only the `t`, `f`, `never` and `equal` members hanging off it are gone.
  
  Newly deprecated, to be removed in the next major:
  
  | Deprecated | Replacement |
  | --- | --- |
  | `Concat` | `ArrayPlus.Concat` |
  | `drop()` | none — the type does not sufficiently cover the use cases |
- 0523360: Remove `LooseArrayType`, `IsLooseArray`, `NotLooseArrayType` and `IsNotLooseArray`.
  
  These were a stopgap added while `ArrayType` still did a strict, tuple-excluding
  check (#330). `ArrayType` and its variances are gone in 8.0.0, and their
  replacement `IsArray` is loose by default — a tuple is an array, the same way a
  string literal is a `string` for `IsString`. That leaves the stopgap with nothing
  to stop.
  
  Migration:
  
  | Removed | Replacement |
  | --- | --- |
  | `LooseArrayType<T>` | `IsArray<T, { selection: 'filter' }>` |
  | `IsLooseArray<T>` | `IsArray<T>` |
  | `NotLooseArrayType<T>` | `IsNotArray<T, { selection: 'filter' }>` |
  | `IsNotLooseArray<T>` | `IsNotArray<T>` |
  
  The filter form is not a literal drop-in: `IsArray` distributes over unions, so
  `IsArray<number[] | 1, { selection: 'filter' }>` is `number[]`, where
  `LooseArrayType<number[] | 1>` returned the whole `number[] | 1`.
  
  For anyone who relied on the old strict `ArrayType` behaviour, that is
  `IsArray<T, { exact: true }>` (`{ selection: 'filter', exact: true }` to filter).
  
  `ArrayPlus.IsReadonly` is now built on `IsArray`; its behaviour is unchanged.
- 3710c48: `ArrayPlus.IndexAt` now takes an options object instead of positional fallback type parameters.
  
  The three positional parameters `Fail`, `Upper`, and `Lower` are replaced by
  `Options`, which covers five cases:
  
  | Option | Applies when | Default |
  | --- | --- | --- |
  | `$never` | `A` is `never` | `never` |
  | `$array` | `A` is an array (not a tuple) | `N` |
  | `caseEmptyTuple` | `A` is `[]` | `never` |
  | `caseUpperBound` | `N` is past the upper bound | `A['length']` |
  | `caseLowerBound` | `N` is past the lower bound | `0` |
  
  The `$never` and `$array` cases are new: they were previously not customizable.
  Only the cases you specify are overridden; the rest keep their defaults.
  
  Migration:
  
  ```ts
  // before
  type R = IndexAt<[1], 1, 'f', 'u', 'l'>
  // after
  type R = IndexAt<[1], 1, { caseEmptyTuple: 'f'; caseUpperBound: 'u'; caseLowerBound: 'l' }>
  ```
  
  Note that the old `Fail` parameter also covered the `A is never` case.
  If you relied on that, set `$never` to the same type as `caseEmptyTuple`.
  
  Default behavior is unchanged, so `IndexAt<A, N>` and `ArrayPlus.At` /
  `ArrayPlus.IsIndexOutOfBound` are not affected.

### Minor Changes

- f4939f9: Add `testType.defer` and `testType.assert` for deferred type testing.
  
  A `testType.*` check asserts immediately: the expectation is an argument, so
  the failure is reported where the check is written. That makes a check
  impossible to extract into a reusable helper — the helper body is checked once,
  against type parameters that are not yet resolved, so nothing there can pass or
  fail.
  
  `testType.defer.*` takes no argument and returns the result as a type instead.
  A helper returns the results it collected, and `testType.assert()` checks them
  at the call site, where the type parameters are resolved:
  
  ```ts
  function testMyType<T>() {
  	return [testType.defer.string<T>(), testType.defer.not.never<T>()]
  }
  
  it('blah', () => { testType.assert(testMyType<'a'>()) }) // passes
  it('bruh', () => { testType.assert(testMyType<1>()) })   // fails here
  ```
  
  `testType.assert()` accepts results in any shape a helper returns — a single
  result, an array, an object, or any nesting of those. `testType.defer.not.*` is
  the deferred form of passing `false`. Deferred checks take the same options as
  their immediate counterparts, in the same position and merged over the same
  defaults. Every check has a deferred form except `inspect`, which is a
  development aid rather than a check.
  
  A failing check resolves to `testType.Failed<Check, Actual, Expected>` rather
  than a bare `false`, so the compiler error names the check that failed and the
  types it compared.
- 5f1ff23: Deprecate `NotExtendable`, `IsExtend` and `IsNotExtend`, completing the group
  `Extendable` already belonged to. Nothing is removed and no behavior changes;
  each type now names its replacement.
  
  | Deprecated | Use instead |
  | --- | --- |
  | `IsExtend<A, B, Then, Else>` | `Assignable.$<A, B, { $then: Then; $else: Else }>` |
  | `IsNotExtend<A, B, Then, Else>` | `NotAssignable.$<A, B, { $then: Then; $else: Else }>` |
  | `Extendable<A, B>` | `Assignable.$<A, B, { selection: 'filter' }>` |
  | `NotExtendable<A, B>` | `NotAssignable.$<A, B, { selection: 'filter' }>` |
  
  `#665` names the replacement as `$Assignable`, which does not exist. The `$`
  type util hanging off `Assignable` and `NotAssignable` is the equivalent, and
  the mapping above is pinned by compiled assertions in
  `src/predicates/predicates_docs.spec.ts` rather than asserted.
  
  ⚠️ Migrating to plain `Assignable`/`NotAssignable` instead of the `$` member is
  **not** a rename. The plain types special-case `any`, `never` and `unknown`, so
  three inputs change answer:
  
  ```ts
  IsExtend<any, number> // boolean
  Assignable<any, number> // true
  Assignable.$<any, number, {}> // boolean -- the equivalent
  ```
  
  `Assignable.$` also requires its options argument explicitly (`{}` at minimum),
  and supports `{ distributive: false }`, which the deprecated four cannot
  express.
- 92fb5ad: Add `testType.has*` for asserting union membership.
  
  `testType.undefined<T>()` asks whether `T` *is* `undefined`. There was no way
  to ask whether `T` *contains* `undefined`, which is the common shape when a
  value is optional:
  
  ```ts
  type R = number | undefined
  
  testType.hasUndefined<R>(true)
  ```
  
  Three assertions are added — `hasUndefined`, `hasNull` and `hasVoid` — backed
  by the `HasUndefined`, `HasNull` and `HasVoid` predicates. `HasUndefined`
  already existed; `HasNull` and `HasVoid` are new and are exported alongside it.
  
  All three distribute over the union explicitly, checking each branch on its
  own before folding the branches back into a single answer. `HasUndefined`
  keeps the results it had; the explicit distribution matters for `HasVoid`,
  because `IsVoid<number | undefined>` widens to `boolean` and would otherwise
  report `number | undefined` as containing `void`.
  
  The `has*` methods take no options type parameter, alongside `any`, `unknown`,
  `never` and `equal`: `distributive` is what the check is made of, and none of
  `undefined`, `null` or `void` has a literal subtype for `exact` to narrow. Note
  that `has*` is not the same as passing `{ distributive: true }` to the plain
  check — distribution widens the result to `boolean`, which accepts both `true`
  and `false` and so asserts nothing, while `has*` folds the branches back into a
  single answer.
  
  Each also has a deferred form — `testType.defer.hasUndefined<T>()` and
  `testType.defer.not.hasNull<T>()` — keeping the rule that every `testType`
  check but `inspect` mirrors into `testType.defer`.
  
  There is no `hasAny`, `hasUnknown` or `hasNever`. A union absorbs those types,
  so they can never be one branch among several, and `testType.any`,
  `testType.unknown` and `testType.never` already answer the question.
- c87ca35: `testType` type checks accept options.
  
  Each check now takes an optional second type parameter carrying the behavioral
  options of the `IsXXX` type behind it — `testType.$Options` is
  `{ distributive?: boolean; exact?: boolean }`. `canAssign` and
  `strictCanAssign` take it as their third and accept `distributive` only.
  
  ```ts
  testType.string<'a', { exact: true }>(false)
  testType.array<[string], { exact: false }>(true)
  testType.string<'a' | 1, { distributive: true }>(true)
  testType.strictCanAssign<number | string, number, { distributive: true }>(true)
  ```
  
  Options are merged over each method's own defaults, so the existing
  no-options call form keeps the behavior it has always had. The parameter
  defaults to `{}` and sits after the type under test, so inference at existing
  call sites is unchanged — the whole suite type-checks unmodified on TypeScript
  5.4 through 7.
  
  `any`, `unknown`, `never` and `equal` take no options — none of the types
  behind them has a distributive or exact dimension. A new guide,
  [Migrating from Then/Else to $Options][migration], documents how that older
  signature maps onto `$O` and which types have yet to move.
  
  [migration]: https://cyberuni.github.io/type-plus/guides/migrating-then-else-to-options/

### Patch Changes

- af380ad: Remove the unreferenced half of the legacy `src/**/readme.md` documentation
  tree, and the stale root `info.md`.
  
  These are v6/v7-era pages documenting an API that no longer exists — for
  example `src/numeric/readme.md` still described `Positive<T>`, `Negative<T>`,
  `Integer<T>`, `IsWhole<T>` and a `NumericType<T, Then, Else>` signature, none
  of which the package exports any more. `src` is listed in `files`, so they were
  shipping in the tarball; 13 of the 33 are gone from it now.
  
  Nothing was lost. The explanation that only lived in these pages was ported to
  the documentation site first: branch-option composition, `$Special`, `$Error` /
  `$InferError` and the `$Type` brand moved onto the *type branching* page, and
  `Equal` — previously undocumented on the site — gained an *Equality* page
  carrying the one-level intersection caveat.
  
  The remaining 20 pages stay for now: `packages/type-plus/readme.md` links into
  them 122 times, so they cannot be removed without rewriting the published
  readme.
- 377d481: Correct the TSDoc for the `string`, `object`, `tuple` and `union` types, and pin every documented
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
- 29f0d2f: Document the 8 undocumented exports in `src/predicates/` and the 7 branch
  markers in `src/$type/`.
  
  Every `@example` is pinned by a compiled assertion in
  `src/predicates/predicates_docs.spec.ts` and `src/$type/$type_docs.spec.ts`.
  
  `$Then`, `$Else`, `$Selection`, `$Distributive` and `$Exact` are what the
  `$Options`/`$Branch` convention rests on, so they now say what a caller passes
  and what comes back.
  
  Six of the predicates are listed in #665 for removal or migration. Each says so
  in its own TSDoc rather than reading as current API.
- ec50ea6: Document the 9 undocumented exports in `src/math/`.
  
  Every `@example` is pinned by a compiled assertion in
  `src/math/math_docs.spec.ts`, so an example that drifts from the
  implementation fails to build.
  
  The edges these types were missing documentation for are the ones a caller
  cannot guess:
  
  - `GreaterThan` and `Max` accept `bigint` in their constraint but resolve to
    `Fail` for every `bigint` argument.
  - Arithmetic on fractional literals whose result is a whole number resolves to
    an error string rather than a number.
  - `Add`, `Subtract` and `Multiply` are exact decimal, so `Add<0.1, 0.2>` is
    `0.3` where the runtime gives `0.30000000000000004`.
  - Nothing guards overflow past `Number.MAX_SAFE_INTEGER`.
- 8957681: Correct the TSDoc for the numeric types.
  
  `IsNegative<any>`, `IsPositive<any>`, `IsNotNegative<any>` and `IsNotPositive<any>`
  were documented as `boolean`. The special types are not numeric, so the sign checks
  reject them: `IsNegative<any>` and `IsPositive<any>` are `false`, and their negations
  are `true`. `IsInteger<number>` and `IsNotInteger<number>` were documented as `false`
  and `true`; the wide `number` type contains both integers and non-integers, so both
  resolve to `boolean`.
  
  The numeric predicates now document their `filter` selection, union distribution and
  `$Branch` options in the same shape as the rest of the library, and the stale
  `$SelectionBranch` name in the `number` and `bigint` examples is replaced by the
  `$Branch` each type actually exports.
  
  The `number` examples for disabling union distribution used `number | 1`, which
  TypeScript collapses to `number` — so they demonstrated nothing and stated the wrong
  result. They now use `1 | string`, which is a real union.
  
  Every documented example across `numeric`, `number` and `bigint` is now asserted by
  that type's own spec, so an example that drifts from the implementation fails to
  compile.
- e4a3bc0: Stop emitting `esm/package.json`, and declare `"sideEffects": false` in the
  `cjs/package.json` marker.
  
  The package root already declares `"type": "module"`, so `esm/*.js` are ESM by
  inheritance — the marker restated what was already true. It was also costing
  consumers tree-shaking. Bundlers read `sideEffects` from the nearest
  `package.json` describing a module, and `esm/package.json` became that file for
  every ESM entry point while carrying no `sideEffects` field, so webpack fell
  back to assuming side effects. Bundling an ESM consumer that imports a single
  symbol produced 32,779 bytes across 21 modules with the file present and 707
  bytes across 2 modules without it. Rollup with `@rollup/plugin-node-resolve`
  produced byte-identical output either way — its own static analysis drops the
  unused modules regardless — so this was a webpack-class regression, not a
  universal one.
  
  The `cjs/package.json` marker stays: without it Node reads `cjs/index.js` as
  ESM and its `require()` calls resolve against the caller. It now also carries
  `"sideEffects": false`, since it shadows the root field for CJS consumers the
  same way.
- 46e6185: Document the 36 undocumented exports in `src/object/`.
  
  Every `@example` is pinned by a compiled assertion in
  `src/object/object_docs.spec.ts`, so an example that drifts from the
  implementation fails to build.
  
  Four of the newly documented types do not do what their names say. The
  documentation records the behavior rather than changing it:
  
  - `KnownKeys<T>` resolves to `never` for every `T` on every supported
    TypeScript version.
  - `KeysOfOptional<T>` returns `keyof T` when every property is required, and
    `never` as soon as one is optional.
  - `RecursiveRequired<T>` does not descend into optional properties.
  - `hasKey()` and `hasProperty()` test truthiness rather than key presence, and
    `getField()` replaces any falsy value with the default.

## 8.0.0-beta.11

### Minor Changes

- 23ecd4a: Support TypeScript 5.4 and up.
  
  The `typescript` peer range widens from `>= 5.6.0` to `>= 5.4.0`. Nothing in
  the published types ever required 5.6 — the range was simply narrower than
  what the compiler matrix tested. `verify:dts` now type-checks the emitted
  `esm/index.d.ts` with 5.4, 5.5, 5.6 and 6.0, so the range is checked rather
  than asserted.
  
  The package is also now built with TypeScript 7 — one build, as before.
  Emitted JavaScript is unchanged; the declarations differ only in how the
  compiler renders them.

## 8.0.0-beta.10

### Patch Changes

- e58fac6: Ship a `cjs/package.json` marker so `require('type-plus')` works again.
  
  The package root declares `"type": "module"`, so Node treated the CommonJS
  output in `cjs/` as ESM. `cjs/index.js` then resolved its own `require()`
  calls against the caller instead of against the package, and every CJS
  consumer failed with `Cannot find module './array/array_plus.js'`.
  
  The build now writes `cjs/package.json` (`{"type":"commonjs"}`) and, for
  symmetry, `esm/package.json` (`{"type":"module"}`) after each compile. The
  7.x build emitted the CJS marker via `buddy ts build cjs`; moving to a plain
  `tsc` emit dropped it.

## 8.0.0-beta.9

### Patch Changes

- bd98d9b: Update runtime dependencies: `tersify` `^3.11.1` -> `^4.0.6` and `unpartial` `^1.0.4` -> `^1.0.7`.
  
  Both are runtime `dependencies` of `type-plus`, so this changes what consumers resolve.
  
  Two consumer-visible consequences, neither of which touches the type-level API:
  
  - `assertType`'s failure message renders the validator through `tersify`, and `tersify@4`
    preserves the quote style of the original source instead of normalising it to double
    quotes. A validator written as `subject => typeof subject === 'boolean'` now reports
    `subject fails to satisfy subject => typeof subject === 'boolean'` rather than
    `... === "boolean"`. Only the diagnostic string changed; the assertion behaviour did not.
  - `unpartial@1.0.7` declares `engines: { node: '>= 20' }`, so the effective Node floor for
    `type-plus`'s runtime dependencies is Node 20. `tersify@4` also targets ES2020 (it was
    ES5 in v3).

## 8.0.0-beta.8

### Patch Changes

- 929fb13: Add `typescript` peer dependency (v5.6.0 or higher).
- 3c8a66a: Update `AdjustExactOptionalProps` to trim empty object (`{}`) when the input type has only optional or required properties.
- 3dc8849: Preserve `any` and `unknown` in `Properties<T>` so they are returned unchanged instead of mapping to object types. Expand JSDoc with description and examples.

## 8.0.0-beta.7

### Minor Changes

- 335b870: Rename `$ExactOptions` to `$Exact.Options`,
  `$ExactDefault` to `$Exact.Default`,
  `$IsExact` to `$Exact.Parse`
- 4b2b89c: Replace `Equal` with the new `$Equal` type.
- d418300: Rename `$IsDistributive` to `$Distributive.Parse`.
- 1debfc2: `$Equality` to `$Equal`.
- 407b3d3: Deprecate `NoInfer`.
- 3d70869: Remove `$Override`. It is not needed.
- abdc5fe: Update bit types
- 53f6c0b: Consolidate `$Selection` types.
- 1c7bab7: Deprecate `Failed` and `FailedT`.
- 2ed6063: Update `$Type` to work with primitive types and improve object type usage.
- 19663d7: Rename `$SpecialType` to `$Special`.
- f09ef4d: Add `$Void` support.
- d5e732a: Update `Equal` signature and implementation.
  Deprecate `IsEqual` and `IsNotEqual` in favor of `Equal`.
- 5263e8f: Rename `$DistributiveOptions` to `$Distributive.Options` and `$DistributiveDefault` to `$Distributive.Default`.
- 51a7bea: Rename `$Select` to `$Equal`.
  Remove `$SelectStrict`, use `$Equal<T, U, { exact: true }>` instead.
- b150471: Updato logical types.
- ed723c7: Add `$Void` support to `IsAny` and `IsNotAny`.
- c56d4a0: Change `$ResolveBranch` type parameters order.
  `T` is moved to the last position as `D` (as it is the default value), and made optional.
- b364e73: Export `$Exact`.

### Patch Changes

- e110219: Fix `$ResolveOptions` type to handle `undefined` value.
- 20ded29: Use `fn.apply` instead of spread.
  It has better performance and function that are already bound continue to work as expected.

  ```ts
  const bindFn = fn.bind(This);

  bindFn.apply(null, args); // `this` is not affected
  ```

## 8.0.0-beta.6

### Minor Changes

- cb37ca4: Add `AdjustExactOptionalProps`.

## 8.0.0-beta.5

### Minor Changes

- 17bf492: Remove `$Exact` namespace.
  `$Exact.$Options` is now `$ExactOptions`.
  `$Exact.$Default` is now `$ExactDefault`.
  `$Exact.$IsExact` is now `$IsExact`.

### Patch Changes

- ac73d79: Removing incorrect usage of the `typesVersions` field in `package.json`.
- 1e5108d: Add `SubUnion` type.
- 37e47dc: Remove `$Exact` branch type. It is not needed anymore.

## 8.0.0-beta.4

### Minor Changes

- 2d4d9b4: Reintroduce CJS support.

## 8.0.0-beta.3

### Patch Changes

- bbe256cb5: Remove `exports.default` in `package.json`.

  That provide the wrong file to systems expecting CJS.
  May need to add a different one for browser-spec.

## 8.0.0-beta.2

### Minor Changes

- f9821214a: Update to require typescript 5.4.

### Patch Changes

- 4ae069b28: Fix `IsPositive<number & { a: 1 }>` should return `boolean`
- 72272509c: Simplify `Omit` type as the simpler code is working with typescript 5.4
- 8901e750a: Work around excessive stack depth error in TS 5.4 for type `Zeros`.
- b480c6c2b: Update some docs under `numerics`
- 3d56d1a39: Fix `IsInteger<number & { a: 1 }>` should returns `boolean`
- cc94afdc3: Fix `IsNegative<number & { a: 1 }>` should return `boolean`

## 8.0.0-beta.1

### Major Changes

- a27e32e4e: Update `IsSymbol` and variances
- 3957e3193: Update `IsUnknown` and `IsNotUnknown`. Reomove `UnknownType` and `NotUnknownType`.
- d677a793e: Remove `StrictBigintType` and `NotStrictBigintType`
- 9e51d0b09: Remove `NonUndefined`. Use `Exclude` instead.
  Remove `NonNull`. Use `Exclude` instead.
- 25b5d31f1: Remove `Positive`, `Negative`, `NumericType`, `NotNumericType`,
- 7e2ab3925: Update `IsTuple` and variances.
- 322a33df0: Update `IsString` and its variances.

### Minor Changes

- 33c02089f: Update `IsFunction`, `IsNotFunction`, `IsStrictFunction`, `IsNotStrictFunction`.

  Remove `FunctionType`, `NotFunctionType`, `StrictFunctionType`, `NotStrictFunctionType`.

- 4c991f199: Add `Assignable<A, B>`.
  Deprecated `CanAssign<A, B>` and `StrictCanAssign<A, B>`.
- d8848947a: Add `$DefineInputOptions` and `$DefineBranchOptions`.
  Add support of handing `$any`, `$unknown`, `$never` for `IsAny`.

  Add `$ResolveBranch` that fixes the `unknown` passthrough issue.

  The types will be able to use in the form of `IsAny<T, { $then:..., $else:...}>`, hopefully.

  It's still not recommended to do so, but at least it will not produce weird results.

  Will need to convert other types to support that and add tests for them.

- 4dc227a62: Update `IsObject` and variants

### Patch Changes

- 973cc4a9f: Move source under `packages/type-plus`.

## 8.0.0-beta.0

### Major Changes

- 2a0d791c6: Rename `case*` to `$*` to make them easier to use.
- 061640050: Update and release as ESM package only.

### Minor Changes

- afac18a02: Add `IsStrictObject<T>` type.
- b98ed6d9f: Accept `readonly` for array.
  Add `ArrayPlus.IsReadonly`.

  Fix `ArrayPlus.Reverse` to support `readonly`.

- 69c540985: Add `Merge<A, B>` and `ObjectPlus.Merge<A, B>`
- de549578a: Add customize support for `ArrayPlus.Filter`
- 711639289: Add `Box<T>` to box primitive types to their boxed types.

### Patch Changes

- 3ed4dce5e: Optimize `SplitAt` by moving never check of `DeleteCount` to the top.
- 5535a4a6d: fix `IsArray<never[]>`
- d852d76b3: Add docs for `ArrayPlus.IsReadonly`.

  The following are internal changes thus not considered a breaking change:

  - Replace `MergeOptions`/`MergeCases` with `TypePlusOptions.Merge`.
  - Rename `TypePlusOptions.Predicate` to `TypePlusOptions.Selection`.

## 7.6.0

### Minor Changes

- 036094ba5: Support `Delete` and `Insert` for `SplitAt`.

### Patch Changes

- e76c6895d: Add keywords

## 7.5.0

### Minor Changes

- 4f1e6e813: Add `UnionType` and `IsUnion`
- 1bee3922b: Improve `FindFirst` and `ArrayPlus.Find` to support `union_miss` and `never` cases,
  and some bug fixes.
- b3d0af0d2: Export the improved `Required` type.
- bc535d4dd: Support customization for `Head` and `Tail`
- d2f97ca18: Add options support for:

  - `TupleType`, `IsTuple`, `NotTupleType`, `IsNotTuple`
  - `DropFirst`, `DropLast`,
  - `FindFirst`, `ArrayPlus.FindFirst`, `TuplePlus.FindFirst`

  Add `MergeOptions`.
  Add `NotUnknownOr` (all use cases are handled by `MergeOptions` at the moment)

- 94bb1c00c: Improve `FindFirst`,
  add `ArrayPlus.Find` and `TuplePlus.Find`
- 4e7e31098: Clean up `CommonPropKeys`.

  Add `ArrayPlus.CommonPropKeys` and `TuplePlus.CommonPropKeys`.
  Add support of `caseNever`.

- 7a647ca41: Support override `never` case for `TupleType`, `IsTuple`, `IsNotTuple`, and `NotTupleType`

### Patch Changes

- 91211c9b5: Rename `caseNoMatch` to `caseNotMatch`.
  Rename `caseUnionMiss` to `caseUnionNotMatch`.

  Change `caseUnionNotMatch` default from `undefined` to `never`,
  making it defaults to the type behavior instead of JavaScript behavior.

- 8a60488be: Move TestType under `testType` so that it is exported

## 7.4.0

### Minor Changes

- b55a61de3: Deprecate `drop()` as it does not sufficiently support the needed types.
- cb2c68694: Add `extends()`, `union()`, `intersect()`, `union_*`, `intersect_*` to `InspectedType`.

### Patch Changes

- 81158731b: Separate `Filter` and `PadStart` for array and tuple
- 9f08f5635: Improve `Head` and `Last` to support empty_tuple override
- 9f08f5635: Improve `IntersectOfProps` to work with array just for completeness.
- 810181628: Improve `DropFirst` and `DropLast` to support overriding cases.
- 58da4b3ee: Update export field to export `./package.json`.
- 2454ab228: Improve `CommonPropKeys`

## 7.3.1

### Patch Changes

- 90eb2a492: Update package.json try fixing readme references

## 7.3.0

### Minor Changes

- e8547eb88: Add `IsOptionalKey<T, K>`.
- bd6c695a2: Add `OptionalProps<T>`.
  Improve `OptionalKeys<T>` and `IsOptionalKey<T, K>`
- d3faa0bff: Add `OptionalKeys<T>`

### Patch Changes

- d214ce6d7: Improve `testType.inspect<T>(fn)` to provide more information about `T`.

  Not consider as breaking change as the function is not expected to be use in any code.

## 7.2.1

### Patch Changes

- 6be5fa7b0: Improve `IsLiteral` type to support `boolean`, `bigint`, and `symbol`.
- 0f0b9f8e0: Improve `LeftJoin` type behavior.

## 7.2.0

### Minor Changes

- a52cce02: Add `testType.inspect<T>(fn)` for easy type inspection.

## 7.1.1

### Patch Changes

- 26537d8e: Improve `RecursivePartial` to work with function type.
  Also add `| undefined` to make it compliant with `exactOptionalPropertyTypes`.

## 7.1.0

### Minor Changes

- aacb1ff4: Add `AnyOrNeverType` for parity.

  Update some code's JSDocs.

### Patch Changes

- ede34c22: Improve `exports` field
- 74a71e35: remove extra empty `{}` for `LeftJoin`
- 2d74ff0b: Support `verbatimModuleSyntax`

## 7.0.1

### Patch Changes

- 946c6023: Remove `@internal`. It is causing those types to be skipped from output (cjs/esm/\*.d.ts).

## 7.0.0

### Major Changes

- 91c954fb: Remove `Digit` and `DigitArray`.

  They are internal types to begin with.
  They were exported probably to fix the "type cannot be named" error.

- 469c8bd2: Fix array `PadStart`/`PadLeft` that triggers an infinite loop.

  Change default `PadWith` from `any` to `unknown` (breaking).

### Minor Changes

- e11d43c5: Expose `FindLast` also as `ArrayPlus.FindList`.

  Improved its handling of array.

- 25e5fcb2: add `NumericPlus`
- ee14247c: Add `ArrayPlus.SplitAt`
- a49abe20: Mark the following code as deprecated:

  - `isType.t()`
  - `isType.f()`
  - `isType.never()`

- 4352d514: Add `StringToNumber`, `StringToBigint`, and `StringToNumeric`
- e93e366d: Add alternative `Partial<T>` type that works with `exactOptionalPropertyTypes`.
- 10af3634: Add `ArrayPlus.Reverse<A>`
- 82ffd7d9: Add `NumericToString`
- 72aca9d0: Add `MathPlus.ToNegative`
- 09495bec: Add `ArrayPlus.Entries<A>`.
- 3e0e199b: Add remaining types to `testType.*`.

  `testType` is changed to a proxy to simplify implementation.

- 73bbcf0e: Add `PadStart`, deprecase `PadLeft`
- 65e84c4b: Expose `FindFirst` also as `ArrayPlus.Find`.

  Improved its handling of array.

- d2997ded: Deprecate `Equal` and `NotEqual`. They are renamed to `IsEqual` and `IsNotEqual`.

  `Equal` and `NotEqual` will be changed to `filter` variant (a.k.a. `parse` variant) in the future.

- 180a455e: Add `TuplePlus.PadStart`.
- 7bf5d39e: Add `StrictCanAssign<A,B>` and `testType.strictCanAssign()`
- 010a7880: Deprecate `assertType(subject constructor)`.
  Add `T/F` to `Extendable` and `NotExtendable`.
- 74cc6545: Alias `Some` under `ArrayPlus.Some`.
- 4054c64b: `GreaterThan` and `Max` now support floating point and negative numbers, and `bigint`

### Patch Changes

- 84617522: `At` should return `V | undefined` for tuple when `N` is `number` (or `any` which includes `number`).
- aaffd23e: fix `Some<Array<number | string>, number>` to return `boolean`.
  This is because besides `Array<number | string>` can be `[1, 'a']`,
  it can also be:

  ```ts
  const v: number | string = 123;

  const a: Array<number | string> = [v];
  ```

  So `Some<Array<number | string>, number>` should distribute and return `boolean`.

- 4878eb07: `At` should return `V | undefined` for array.
- afc1840c: Add `Upper` and `Lower` for `IndexAt`.

  This allow fine-grained control over the `IndexAt` behavior,
  when the value is out of bounds.

  This is used in cases where out-of-bounds values are coarsen to the upper and lower bound of the subject array.

- d31ea31f: Improve `Abs` to work with `bigint`

## 6.8.1

### Patch Changes

- caa70e9e: Support isolated stub.builder use case.

## 6.8.0

### Minor Changes

- 38b59e9b: Add `stub.builder()`
- c2b6f375: Add more `testType.*`:

  `testType.undefined()`
  `testType.null()`
  `testType.bigint()`
  `testType.strictBigint()`
  `testType.string()`
  `testType.strictString()`

### Patch Changes

- 38b59e9b: `stub.build()` should not accept no `init` value.

## 6.7.1

### Patch Changes

- 963f8a4a: Pass stub value to init function for `stub()`

## 6.7.0

### Minor Changes

- cf32375f: Add `NoInfer<T>` and improve `stub()`

## 6.6.0

### Minor Changes

- e098b7c3: Add `StringSplit`
- 6a4bfd71: Add `StringIncludes` type.

### Patch Changes

- a9825e69: Update JSDocs
- 7496bbaf: Remove extra unique symbol.
- f52c794b: Fix `Equal<A, B>` to handle optional param.

## 6.5.0

### Minor Changes

- 99afa70a: Add `Failed` and `FailedT` error type.

### Patch Changes

- c741e86e: Improve `Brand` and `Flavor` to handle all types.
  Added `Branded` and `Flavored` interface to improve their rendering in IDE.

## 6.4.0

### Minor Changes

- bcc4b094: Adding a new set of types for type-level programming.

  - `IsAnyOrNever`
  - `AnyType`, `IsAny`, `NotAnyType`, `IsNotAny`
  - `NeverType`, `IsNever`, `NotNeverType`, `IsNotNever`
  - `StrictBooleanType`, `IsStrictBoolean`, `NotStrictBooleanType`, `IsNotStrictBoolean`
  - `BooleanType`, `NotBooleanType`, `IsNotBoolean`
  - `TrueType`, `IsTrue`, `NotTrueType`, `IsNotTrue`
  - `FalseType`, `IsFalse`, `NotFalseType`, `IsNotFalse`
  - `ObjectType`, `IsObject`, `NotObjectType`, `IsNotObject`
  - `StrictFunctionType`, `IsStrictFunction`, `NotStrictFunctionType`, `IsNotStrictFunction`
  - `FunctionType`, `IsFunction`, `NotFunctionType`, `IsNotFunction`
  - `UndefinedType`, `IsUndefined`, `NotUndefinedType`, `IsNotUndefined`
  - `NumberType`, `IsNumber`, `NotNumberType`, `IsNotNumber`
  - `StrictNumberType`, `IsStrictNumber`, `NotStrictNumberType`, `IsNotStrictNumber`
  - `StringType`, `IsString`, `NotStringType`, `IsNotString`
  - `StrictStringType`, `IsStrictString`, `NotStrictStringType`, `IsNotStrictString`
  - `SymbolType`, `IsSymbol`, `NotSymbolType`, `IsNotSymbol`
  - `BigIntType`, `IsBigInt`, `NotBigIntType`, `IsNotBigInt`
  - `StrictBigIntType`, `IsStrictBigInt`, `NotStrictBigIntType`, `IsNotStrictBigInt`
  - `VoidType`, `IsVoid`, `NotVoidType`, `IsNotVoid`
  - `UnknownType`, `IsUnknown`, `NotUnknownType`, `IsNotUnknown`
  - `Positive`, `IsPositive`, `NotPositive`, `IsNotPositive`

  Adding a new `testType` for testing.
  It provides better testing support compares to `isType` and `assertType`.

  Improve:

  - `Equal`: to support all known scenarios.

## 6.3.0

### Minor Changes

- 1168acaa: Add `TupleType`

### Patch Changes

- 97888e9e: `Equal` handles tuple

## 6.2.0

### Minor Changes

- bc82e907: Fix number types to support `never` correctly.

  Add `IsInteger`, `Positive`.

### Patch Changes

- 23fd42a3: Fix `NumberType` to handle `any` and union.

## 6.1.0

### Minor Changes

- b6403520: Add `ArrayType<A>`
- 569ff770: Export `Concat` under `ArrayPlus`.
- 15257ec3: Add `ArrayPlus.IsIndexOutOfBound<A, N>`
- 82bed0e2: Add `ArrayPlus.IndexAt`.

  Update `At` to use `IndexAt` to get consistent results.

- 015d046e: Fix `IsAny` and add to `AnyType`.
  Now using the same mechanism from `ts-essentials`.
- 3ff303ce: Add `NumberType<T>`

### Patch Changes

- 812949be: Default `CreateTuple<_, T>` to `unknown`.

  With TypeScript 5.0, the tuple size limit is now 9999.

- 52d62003: Clean up type imports.
  Use `Awaited` instead of `PromiseValue`.

## 6.0.0

### Major Changes

- 3a01eb6a: CJS target upgraded to ES2020

### Minor Changes

- 35b489de: Add the following:

  - `isType.never`
  - `Numeric`
  - `Zero`
  - `Integer`
  - `Negative`
  - `NonNegative`
  - `NumberPlus.Numeric`
  - `NumberPlus.Zero`
  - `NumberPlus.Integer`
  - `NumberPlus.Negative`
  - `NumberPlus.NonNegative`
  - `At`
  - `ArrayPlus.At`
  - `ArrayPlus.Concat`

### Patch Changes

- 33b78a76: Add `module` field for `webpack` 4 compatibility.

## 5.6.0

### Minor Changes

- 15443f6d: `stub.build()` now supports an initializer function.
  This allows the init value to be randomized.

## 5.5.2

### Patch Changes

- ce86656f: defaults inspector of `inspect()` to `console.dir()`

## 5.5.1

### Patch Changes

- b02fbae2: Each `extender` will now only execute once,
  across the extend tree.

## 5.5.0

### Minor Changes

- 0247123b: Add `AwaitedProps<T, P>`

  This is useful when working with `context()` where the props are Promise

### Patch Changes

- 6b109359: Allow `context().extend()` to specify type

## 5.4.1

### Patch Changes

- 48520281: Fix `context()` to support `extender` which only needs a partial of the current context.

## 5.4.0

### Minor Changes

- 9add14dc: Add `context()` builder

## 5.3.0

### Minor Changes

- d7338cb2: Add `Then, Else` support to logical types

### Patch Changes

- 29cf3b12: Update JSDocs for ExtractFunction
- 29cf3b12: Improve `Equal<A,B>`
- 5e21ddfe: Update JSDoc for `compose()`

## 5.2.0

### Minor Changes

- 340d54e: Add subject passthrough to object key utilities

### Patch Changes

- f0761b0: Mark inspector param as `Readonly<T>`

## 5.1.0

### Minor Changes

- 1a51b1f: add `inspect()`
- b203aab: deprecates `PromiseValue`. Use the built-in `Awaited<T>` instead.

## 5.0.0

### Major Changes

- d43213f: Deprecates `isConstructor`.
  It cannot reliably detect non-constructors as normal functions and transpiled arrow functions are both returned true.

  Add `isInstanceof()` to do `instanceof` check against `unknown` or union types of constructor and other types.

  `isType()` does not accept `AnyConstructor` anymore. Use `isInstanceof()` instead (breaking).

### Bug Fixes

- release ci ([ed58811](https://github.com/unional/type-plus/commit/ed588111e6cde3cd65f2bcbe3dc474b03c498483))

## [4.18.1](https://github.com/unional/type-plus/compare/v4.18.0...v4.18.1) (2022-12-09)

# [4.18.0](https://github.com/unional/type-plus/compare/v4.17.0...v4.18.0) (2022-11-18)

### Features

- add extractFunction() ([1192e49](https://github.com/unional/type-plus/commit/1192e494e48b24a4d27ed68487f52eb27945709e))

# [4.17.0](https://github.com/unional/type-plus/compare/v4.16.0...v4.17.0) (2022-11-08)

### Features

- add ExtractFunction ([41083d0](https://github.com/unional/type-plus/commit/41083d09be70fde45e2b957cfe722f5ce72e513b))

# [4.16.0](https://github.com/unional/type-plus/compare/v4.15.2...v4.16.0) (2022-10-31)

### Features

- add `PromiseOrValue<T>` ([440d172](https://github.com/unional/type-plus/commit/440d172fcba1b0fa029f08b82ae9cba853617ddd))

## [4.15.2](https://github.com/unional/type-plus/compare/v4.15.1...v4.15.2) (2022-10-30)

### Bug Fixes

- improve Brand type ([9934d91](https://github.com/unional/type-plus/commit/9934d917e1d48876afcf9a40c7594a795881da47))

## [4.15.1](https://github.com/unional/type-plus/compare/v4.15.0...v4.15.1) (2022-10-30)

### Bug Fixes

- isType to work with undefined and symbol ([ca885b9](https://github.com/unional/type-plus/commit/ca885b9c9d70351e0a8135f61804847a84edc96d))
- update isType implemention ([5aaf0f5](https://github.com/unional/type-plus/commit/5aaf0f585dba1cb10fa2599377ce7a1ea4c0d59a))

# [4.15.0](https://github.com/unional/type-plus/compare/v4.14.1...v4.15.0) (2022-10-30)

### Bug Fixes

- adjust import type ([c84e5f5](https://github.com/unional/type-plus/commit/c84e5f5cf3041f7544d0ac49818ad3862c8d443c))

### Features

- add `RecordValue<R>` ([aafafb2](https://github.com/unional/type-plus/commit/aafafb2a37f7d3a16bdde3d0dc41807676937717))

## [4.14.1](https://github.com/unional/type-plus/compare/v4.14.0...v4.14.1) (2022-10-13)

### Bug Fixes

- improve pick and omit ([b7628cb](https://github.com/unional/type-plus/commit/b7628cbb1b5c9b005abca7abea62eb761170dd1c))
- keep prototype null-ness ([af54c8e](https://github.com/unional/type-plus/commit/af54c8e7cdd6097461ca59d50a211b98904d2ab0))

# [4.14.0](https://github.com/unional/type-plus/compare/v4.13.2...v4.14.0) (2022-10-10)

### Features

- support custom record ([846aff6](https://github.com/unional/type-plus/commit/846aff691a12053713a7afa14610772f418fbaa4))

## [4.13.2](https://github.com/unional/type-plus/compare/v4.13.1...v4.13.2) (2022-10-08)

### Bug Fixes

- loosen isType() validator to accept anything ([9f0c405](https://github.com/unional/type-plus/commit/9f0c405fff752394e3c8d6280a77074e3ec6468e))

## [4.13.1](https://github.com/unional/type-plus/compare/v4.13.0...v4.13.1) (2022-09-15)

### Bug Fixes

- add `EitherOrBoth` ([9637d1e](https://github.com/unional/type-plus/commit/9637d1ef1c47e896169aa2e73acdf4bb0ae11d3b))

# [4.13.0](https://github.com/unional/type-plus/compare/v4.12.1...v4.13.0) (2022-09-15)

### Features

- add EitherAnd ([128e834](https://github.com/unional/type-plus/commit/128e834444bb98142742496b1034455541ea5c2e))

## [4.12.1](https://github.com/unional/type-plus/compare/v4.12.0...v4.12.1) (2022-09-13)

### Bug Fixes

- update unpartial ([e461a9c](https://github.com/unional/type-plus/commit/e461a9cad778ebdba4972146a29be294d52b8a02))

# [4.12.0](https://github.com/unional/type-plus/compare/v4.11.3...v4.12.0) (2022-09-12)

### Features

- add IsNever<T> ([a688567](https://github.com/unional/type-plus/commit/a688567d6f60fda7c93e21c070aaaa4414436dc9))

## [4.11.3](https://github.com/unional/type-plus/compare/v4.11.2...v4.11.3) (2022-09-12)

### Bug Fixes

- Equal<A,B> with union types ([4ad548a](https://github.com/unional/type-plus/commit/4ad548a67a79b4ecd55d4b018ad6cff4108d5405))
- handle never case ([f8376ff](https://github.com/unional/type-plus/commit/f8376ff7c86a5c4bd8f0dfa7a878387a5e8cc325))

## [4.11.2](https://github.com/unional/type-plus/compare/v4.11.1...v4.11.2) (2022-09-01)

### Bug Fixes

- export unpartial ([c561fb2](https://github.com/unional/type-plus/commit/c561fb2ff88eb63e13d0fc1ab2e682af3133ada0))

## [4.11.1](https://github.com/unional/type-plus/compare/v4.11.0...v4.11.1) (2022-07-21)

### Bug Fixes

- re-release ([4f26fcd](https://github.com/unional/type-plus/commit/4f26fcdb964dae51b8f3105c6f847fb846b4ae5c))

# [4.11.0](https://github.com/unional/type-plus/compare/v4.10.2...v4.11.0) (2022-07-21)

### Features

- add `assertType.as<T>()` ([#188](https://github.com/unional/type-plus/issues/188)) ([520547f](https://github.com/unional/type-plus/commit/520547fc8f0a644dca2bda4115cc5b7691ebea09))

## [4.10.2](https://github.com/unional/type-plus/compare/v4.10.1...v4.10.2) (2022-06-15)

### Bug Fixes

- update deps ([46d9005](https://github.com/unional/type-plus/commit/46d90053b4d2693eb84c21fe4c3f2f803d19a2b0))

## [4.10.1](https://github.com/unional/type-plus/compare/v4.10.0...v4.10.1) (2022-06-12)

### Bug Fixes

- add cjs/package.json ([58b8463](https://github.com/unional/type-plus/commit/58b84638e6ac04740f1af52f067f0e1d22ffbed3))
- keep comments ([a184caa](https://github.com/unional/type-plus/commit/a184caada7da8c6751a5a2b94c0030714562112f))
