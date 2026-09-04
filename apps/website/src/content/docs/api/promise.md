---
title: Promise
description: Work with values that may or may not be promises, and await selected properties or several promises at once.
sidebar:
  order: 9
---

The `promise` category handles code paths where a value may be synchronous or asynchronous,
and provides small type-level helpers around `Promise`.

## `MaybePromise`

```ts
type MaybePromise<T> = T | Promise<T>
```

The type of a value that may or may not be a promise.

```ts
import type { MaybePromise } from 'type-plus'

function load(): MaybePromise<string> {
	return cache ?? fetchValue()
}
```

## `transformMaybePromise`

```ts
function transformMaybePromise<T, R>(value: Promise<T>, transformer: (value: T) => R): Promise<R>
function transformMaybePromise<T, R>(
	value: T,
	transformer: (value: T) => R,
): T extends Promise<any> ? Promise<R> : R
```

Applies `transformer` to the value, or to the resolved value when it is a promise.
The return type follows the input: a promise in, a promise out; a plain value in, a plain value out.

```ts
import { transformMaybePromise } from 'type-plus'

const a = transformMaybePromise(1, (v) => v + 1) // 2, typed number
const b = transformMaybePromise(Promise.resolve(1), (v) => v + 1) // Promise<number>
```

The same function is also reachable as `MaybePromise.transform`, a const that shares the name of the type:

```ts
import { MaybePromise } from 'type-plus'

const r = MaybePromise.transform(1, (v) => `${v}`) // '1', typed string
```

This is what lets a single code path stay synchronous when it can, without wrapping every value in a promise.

## `isPromise`

```ts
function isPromise<R = any>(subject: unknown): subject is Promise<R>
```

A type guard that checks for a thenable.

```ts
import { isPromise } from 'type-plus'

function unwrap(value: MaybePromise<number>) {
	return isPromise(value) ? value.then((v) => v * 2) : value * 2
}
```

## `mapSeries`

```ts
function mapSeries<R, T = any>(values: T[], fn: (value: T) => Promise<R>): Promise<R[]>
```

Maps over an array with an async function, one at a time, in order.
Unlike `Promise.all(values.map(fn))`, the next call does not start until the previous one resolves.

```ts
import { mapSeries } from 'type-plus'

const ids = ['a', 'b', 'c']
const results = await mapSeries(ids, (id) => fetchRecord(id)) // Record[]
```

Use it when the calls must not run concurrently — rate limits, ordered writes, shared resources.

## `AwaitedProp`

```ts
type AwaitedProp<T extends AnyRecord, K extends keyof T>
```

⚗️ *transform* — awaits only the selected properties of a record, leaving the rest unchanged.

```ts
import type { AwaitedProp } from 'type-plus'

type Input = { id: number; data: Promise<string>; meta: Promise<object> }

type R = AwaitedProp<Input, 'data'> // { id: number; data: string; meta: Promise<object> }
```

## `PromiseValueMerge`

```ts
type PromiseValueMerge<P1, P2, P3 = any, ..., P9 = any>
```

⚗️ *transform* — a promise of the intersection of the awaited values of up to nine promises.

```ts
import type { PromiseValueMerge } from 'type-plus'

type R = PromiseValueMerge<Promise<{ a: 1 }>, Promise<{ b: 2 }>> // Promise<{ a: 1 } & { b: 2 }>
```

It describes the result of merging several concurrent fetches into one object.

## `PromiseValue`

```ts
type PromiseValue<P extends Promise<any>>
```

Extracts the value type from a promise.

:::caution
Deprecated. Use the built-in `Awaited<T>` instead.
:::

```ts
type R = PromiseValue<Promise<string>> // string
```

## Source

- [`src/promise`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/promise)
