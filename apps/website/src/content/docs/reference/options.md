---
title: Options
description: Common options available to the types.
---

These are typical options available to the types and what do they mean.

A type rejects option keys it does not declare, with a message naming the key.
See [Unknown option keys and generic wrappers](../../guides/strict-options/).

## 🎭 Predicate

> 🎭 :performing_arts:

Predicate is also known as *validate* or *logical*.
When the input satisfies the predicate, the type returns `true`. Otherwise, `false`.

It is one of the `$Selection` options (`selection: 'predicate'`).
Typically, it is the default option.

(other icons considered: ⭕)

## 🌪️ Filter

> 🌪️ :tornados:

Filter is a type or function that filters the input.
If the input passes the filter, it is returned unchanged. Otherwise, it returns `never`.

Filter is also known as *pares*, as in [Parse, don't validate][parse-dont-validate].

It is one of the `$Selection` options (`selection: 'filter'`).

The returned input can be narrowed if [🔀 distributive](#-distributive) is also enabled.
This means it is better to infer the return type instead of reusing the input type:

```ts
type IsUndefined<T> = T extends undefined ? T : never

// yes, these are silly, but just an example
type Bad<T> = IsUndefined<T> extends T ? T : never
type Good<T> = IsUndefined<T> extends infer R ? R : never

type R1 = Bad<undefined | number> // undefined | number
type R2 = Good<undefined | number> // undefined
```

(other icons considered: ↪️👉🚋⏩🐾🔑🚪💂🧲🙅‍♂️🪚)

## 🔀 Distributive

> 🔀 :twisted_rightwards_arrows:

Distributive means each value in a union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```

Typically, most types are distributive by default.

## 📌 Exact

> 📌 :pushpin:

Exact means type comparison will be performed strictly, treating subtype as separate types.

```ts
type R1 = IsString<'a', { exact: true }> // false
```

## 🔱 Branching

> 🔱 :trident:

Branching allows you to control the behavior of the types with [type branching](../api/type-branching.mdx).

```ts
type R = IsNever<Input, {
	$any: 1,
	$unknown: 2,
	$then: 3,
	$else: 4,
}>
```

## The options parameter

Predicates and transforms take their options the same way:
one last type parameter `$O`, checked by `$StrictOptions`, defaulting to `{}`.

```ts
type Head<T extends readonly unknown[], $O extends $StrictOptions<$O, Head.$Options> = {}> = ...

export namespace Head {
	export interface $Options extends $Never.$Options {
		$emptyTuple?: unknown
	}
	export interface $Default extends $Never.$Default {
		$emptyTuple: never
	}
}
```

- `X.$Options` declares every key the type accepts, all optional.
- `X.$Default` gives the value each key takes when the caller leaves it out.
  A transform whose default depends on its input takes that input as a parameter,
  as in `DropFirst.$Default<T>`.
- A key the caller passes wins, even when its value is `undefined` or `never`.

### Key names

A key that starts with `$` names what the type returns in one case:

| Key | Returned when |
| --- | --- |
| `$never`, `$any`, `$unknown`, `$void` | the input is that special type |
| `$then`, `$else` | a predicate's condition holds, or does not |
| `$array`, `$tuple`, `$notArray`, `$emptyTuple`, … | the input has that shape |
| `$excluded` | a member of the input is removed by `Exclude` |
| `$fail` | the input cannot be computed, such as `Add<number, 1>` or `StringToNumber<'x'>` |

A key without `$` changes how the type computes: `exact`, `distributive`, `selection`, `widen`.

`$fail` replaces the positional `Fail` parameter.
It defaults to `never`.

```ts
type R1 = Add<number, 1> // never
type R2 = Add<number, 1, { $fail: number }> // number
```

### Positional parameters that stay

Only `StringIncludes` keeps positional `Then` and `Else`.
It is the low-level template-literal check that `StringPlus.Includes` is built on,
and `StringPlus.Includes` is the one that takes options.

Every other fallback is an option key, including the ones that are the point of the type:

```ts
type R1 = NotUnknownOr<unknown, { $unknown: number }> // number
type R2 = Exclude<undefined | 1, undefined, { $excluded: 2 }> // 1 | 2
```

[parse-dont-validate]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
