---
title: String
description: Identity predicates for string, string literals and template literals, plus type-level string manipulation.
sidebar:
  order: 4
---

The `string` category identifies `string`, string literals and template literals, and provides a few
type-level string operations. The predicates follow the usual
[type branching](/type-plus/api/type-branching/) contract, so each one can act as a boolean check, as a
filter, or as a branch selector for your own types.

## IsString and IsNotString

```ts
type IsString<T, $O extends IsString.$Options = {}>
type IsNotString<T, $O extends IsNotString.$Options = {}>
```

`IsString<T>` is `true` for `string` and for any string literal.

```ts
type R1 = IsString<string> // true
type R2 = IsString<'a'> // true
type R3 = IsString<1> // false
type R4 = IsString<string | boolean> // boolean
```

`$Options` combines `$Selection.Options`, `$Distributive.Options`, `$Exact.Options` and input options for
`any`, `unknown`, `never` and `void`. That means `selection: 'filter'` returns the input instead of a
boolean, and `distributive: false` stops a union from being evaluated member by member:

```ts
type R1 = IsString<'a', { selection: 'filter' }> // 'a'
type R2 = IsString<string | boolean, { selection: 'filter' }> // string
type R3 = IsString<string | 1, { distributive: false }> // false
```

`IsNotString<T>` is the negation, and its filter selection keeps everything that is not a string:

```ts
type R1 = IsNotString<1> // true
type R2 = IsNotString<'a'> // false
```

See [Options](/type-plus/reference/options/) for what `selection`, `distributive` and `exact` mean, and
[type branching](/type-plus/api/type-branching/) for `$any`, `$unknown`, `$never`, `$void`, `$then`,
`$else` and the `IsString.$Branch` selectors.

## IsStringLiteral and IsNotStringLiteral

```ts
type IsStringLiteral<T, $O extends IsStringLiteral.$Options = {}>
type IsNotStringLiteral<T, $O extends IsNotStringLiteral.$Options = {}>
```

Distinguishes a literal from the wide `string` type. Template literals count as literals by default.

```ts
type R1 = IsStringLiteral<'a'> // true
type R2 = IsStringLiteral<`${number}`> // true
type R3 = IsStringLiteral<string> // false
```

Use `exact: true` to reject template literals and accept only plain literals:

```ts
type R1 = IsStringLiteral<`${number}`> // true
type R2 = IsStringLiteral<`${number}`, { exact: true }> // false
```

## IsTemplateLiteral and IsNotTemplateLiteral

```ts
type IsTemplateLiteral<T, $O extends IsTemplateLiteral.$Options = {}>
type IsNotTemplateLiteral<T, $O extends IsNotTemplateLiteral.$Options = {}>
```

The mirror image of the above: only template literals pass.

```ts
type R1 = IsTemplateLiteral<`a${number}`> // true
type R2 = IsTemplateLiteral<'foo'> // false
type R3 = IsTemplateLiteral<string> // false

type R4 = IsTemplateLiteral<`${number}`, { selection: 'filter' }> // `${number}`
type R5 = IsTemplateLiteral<'a', { selection: 'filter' }> // never
```

## StringIncludes

```ts
type StringIncludes<Subject extends string, Search extends string, Then = true, Else = false>
```

Checks whether `Subject` contains `Search`. This type predates type branching and takes plain
`Then`/`Else` parameters instead of an options object.

```ts
type R1 = StringIncludes<'abc', 'a'> // true
type R2 = StringIncludes<'abc', 'd'> // false
type R3 = StringIncludes<'abc', 'd', 'yes', 'no'> // 'no'
```

## StringSplit

```ts
type StringSplit<Subject extends string, Seperator extends string>
```

Splits `Subject` on `Seperator` and returns a tuple. An empty separator splits into characters.

```ts
type R1 = StringSplit<'abc', ''> // ['a', 'b', 'c']
type R2 = StringSplit<'a.b.c', '.'> // ['a', 'b', 'c']
type R3 = StringSplit<'abc', 'b'> // ['a', 'c']
```

## StringPlus namespace

`StringPlus` exposes the same operations under shorter names, for when the prefixed names read poorly at
the call site.

```ts
import type { StringPlus } from 'type-plus'

type R1 = StringPlus.Includes<'abc', 'a'> // true
type R2 = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
```

## $ExtractManipulatedString

```ts
type $ExtractManipulatedString<T extends string>
```

A type util (the `$` prefix marks it as building material rather than an everyday type). It unwraps the
intrinsic string manipulation types — `Uppercase`, `Lowercase`, `Capitalize` and `Uncapitalize` — to
recover the string being manipulated. `IsStringLiteral` uses it to see through those wrappers.

```ts
type R1 = $ExtractManipulatedString<Uppercase<'abc'>> // 'abc'
type R2 = $ExtractManipulatedString<'abc'> // 'abc'
```

## Reference

| Type | Description |
| --- | --- |
| `IsString<T, $O>` | `T` is `string` or a string literal |
| `IsNotString<T, $O>` | `T` is neither `string` nor a string literal |
| `IsStringLiteral<T, $O>` | `T` is a string literal (template literals included unless `exact: true`) |
| `IsNotStringLiteral<T, $O>` | `T` is not a string literal |
| `IsTemplateLiteral<T, $O>` | `T` is a template literal |
| `IsNotTemplateLiteral<T, $O>` | `T` is not a template literal |
| `StringIncludes<S, Search, Then, Else>` | `S` contains `Search` |
| `StringSplit<S, Seperator>` | split `S` into a tuple |
| `StringPlus.Includes` / `StringPlus.Split` | namespaced aliases of the two above |
| `$ExtractManipulatedString<T>` | unwrap `Uppercase`/`Lowercase`/`Capitalize`/`Uncapitalize` |

Source: [`src/string`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/string).
