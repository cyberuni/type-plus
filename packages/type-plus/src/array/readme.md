# Array

In TypeScript, the type of JavaScript array can be an [array](#array) or a [tuple](../tuple/readme.md).

`Array<T>` or `T[]` is a type that represents an array of `T`

There is no length limitation to a `Array`,
and each element has the same type `T`.

## Type Checking

The `IsArray<T>` and `IsNotArray<T>` types are used to check if a type is an array.

The check is loose: a tuple is an array, the same way a string literal is a `string`.
Pass `{ exact: true }` to match `Array<T>` only.

### [`IsArray`](./is-array.ts#l67)

`IsArray<T, $O extends $StrictOptions<$O, IsArray.$Options> = {}>`

🎭 *predicate*
🔢 *customizable*

Validate that `T` is an array.

```ts
import type { IsArray } from 'type-plus'

type R = IsArray<number[]> // true
type R = IsArray<[1]> // true

type R = IsArray<number> // false

// exclude tuple
type R = IsArray<[1], { exact: true }> // false

// filter instead of predicate
type R = IsArray<number[], { selection: 'filter' }> // number[]
type R = IsArray<number, { selection: 'filter' }> // never
```

### [`IsNotArray`](./is-not-array.ts#l67)

`IsNotArray<T, $O extends $StrictOptions<$O, IsNotArray.$Options> = {}>`

🎭 *predicate*
🔢 *customizable*

Validate that `T` is not an array.

```ts
import type { IsNotArray } from 'type-plus'

type R = IsNotArray<number> // true

type R = IsNotArray<number[]> // false
type R = IsNotArray<[1]> // false

// exclude tuple
type R = IsNotArray<[1], { exact: true }> // true

// filter instead of predicate
type R = IsNotArray<number, { selection: 'filter' }> // number
type R = IsNotArray<number[], { selection: 'filter' }> // never
```

### Removed

🗑️ **removed in 8.0.0**

`ArrayType`, `NotArrayType`, `IsNotArrayType`, and the interim `LooseArrayType`,
`IsLooseArray`, `NotLooseArrayType`, `IsNotLooseArray` are removed.
Use `IsArray` and `IsNotArray`, with `{ exact: true }` for the strict check and
`{ selection: 'filter' }` for the filter form.

## [At](./at.ts#l20)

`At<A, N, $O extends $StrictOptions<$O, At.$Options> = {}>`

🦴 *utilities*

Gets the type of the array or tuple at positive or negative index `N`.

For array, it will return the union of the type of the array value and `undefined`,
as there is no way to guarantee the array has value at `N`.

```ts
type A = Array<string | number>

type R = ArrayPlus.At<A, 0> // string | number | undefined
```

For tuple, it will return the type of the tuple value at index `N`.

```ts
type T = [number, string, 1, 2, 3]

type R = ArrayPlus.At<T, 0> // number
type R = ArrayPlus.At<T, -1> // 3
```

If the `N` is out of bound,
or `N` is not a valid index,
`ArrayPlus.At` will return the `$O['$fail']` case, which defaults to `never`.

## `Concat`

🗑️ **removed in 8.0.0**: `Concat` and `ArrayPlus.Concat` — use the spread tuple `[...A, ...B]` instead.

## [`FindFirst`](./find-first.ts#l52)

`FindFirst<A, Criteria, $O extends $StrictOptions<$O, FindFirst.$Options> = {}>` — `$O`: `widen`, `$emptyTuple`, `$never`, `$notMatch`, `$widen`, `$unionNotMatch`

🦴 *utilities*
🔢 *customizable*

Find the first type in the array or tuple `A` that matches `Criteria`.

```ts
import type { FindFirst } from 'type-plus'

type R = FindFirst<[true, 1, 'x', 3], string> // 'x'
type R = FindFirst<[true, 1, 'x', 3], number> // 1
type R = FindFirst<[string, number, 1], 1> // widen: 1 | undefined
type R = FindFirst<[true, number | string], string> // unionNotMatch: string
type R = FindFirst<Array<string>, string> // string
type R = FindFirst<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
type R = FindFirst<Array<string | number>, number | string> // string | number
type R = FindFirst<Array<number>, 1> // widen: 1 | undefined
type R = FindFirst<Array<string | number>, number> // unionNotMatch: number

type R = FindFirst<[true, 1, 'x'], 2> // never
type R = FindFirst<string[], number> // never

// customization
type R = FindFirst<[number], 1, { widen: false }> // never
type R = FindFirst<[number], 1, { $widen: never }> // never
type R = FindFirst<[], 1, { $emptyTuple: 2 }> // 2
type R = FindFirst<never, 1, { $never: 2 }> // 2
type R = FindFirst<[string], number, { $notMatch: 2 }> // 2
type R = FindFirst<[string | number], number, { $unionNotMatch: undefined }> // number | undefined
```

## [`FindLast`](./find-last.ts#l19)

## [`Some`](./some.ts)

## [`Filter`](./filter.ts#l17)

`Filter<A, Criteria>`

⚗️ *transform*

Filter the array or tuple `A`, keeping entries satisfying `Criteria`.

```ts
import type { Filter } from 'type-plus'

type R = Filter<[1, 2, '3'], number> // [1, 2]
type R = Filter<Array<string | undefined>, string> // string[]
```

## `KeepMatch`

🗑️ **removed in 8.0.0**: `KeepMatch` — use [`Filter`](#filter) instead.

## [`Head`](./head.ts#l23)

`Head<T, $O extends $StrictOptions<$O, Head.$Options> = {}>` — `$O`: `$never`, `$emptyTuple`

🦴 *utilities*
🔢 *customizable*

Gets the first entry in the tuple or the type of array `T`.

```ts
import type { Head } from 'type-plus'

type R = Head<[1, 2, 3]> // 1
type R = Head<string[]> // string
type R = Head<never> // $never: never
type R = Head<[]> // $emptyTuple: never

// customization
type R = Head<never, { $never: 1 }> // 1
type R = Head<[], { $emptyTuple: undefined }> // undefined
```

## [`IntersectOfProps`](./intersect-of-props.ts)

## `MapToProp`

🗑️ **removed in 8.0.0**: `MapToProp` — use [`IntersectOfProps`](#intersectofprops) instead.

## [`Last`](./last.ts#l23)

`Last<T, $O extends $StrictOptions<$O, Last.$Options> = {}>` — `$O`: `$never`, `$emptyTuple`

🦴 *utilities*
🔢 *customizable*

Gets the last entry in the tuple or the type of array `T`.

```ts
import type { Last } from 'type-plus'

type R = Last<[1, 2, 3]> // 3
type R = Last<string[]> // string
type R = Last<never> // $never: never
type R = Last<[]> // $emptyTuple: never

// customization
type R = Last<never, { $never: 1 }> // 1
type R = Last<[], { $emptyTuple: undefined }> // undefined
```

## [`literalArray`](./literal-array.ts)

## [`PadStart`](./pad-start.ts)

## [`reduceWhile`](./reduce-while.ts)

## [`Reverse`](./reverse.ts)

## `PropUnion`

🗑️ **removed in 8.0.0**: `PropUnion` — use [`UnionOfProps`](#unionofprops) instead.

## [`UnionOfProps`](./union-of-props.ts)

## [`UnionOfValues`](./union-of-values.ts)

## ArrayPlus

`ArrayPlus` contains all types and type utilities related to array.
Whenever possible, these types and type utilities also work with *tuples*,
as *tuples* is a subset of array.

For *tuple* specific types and type utilities,
please check [`TuplePlus`](../tuple/readme.md#TuplePlus).

### [`ArrayPlus.At`](./at.ts#L18)

`ArrayPlus.At<A, N, $O extends $StrictOptions<$O, At.$Options> = {}>`

Alias of [At](#at).

### [ArrayPlus.CommonPropKeys](./array-plus.common-prop-keys.ts#l21)

`ArrayPlus.CommonPropKeys<T extends Record[], $O extends $StrictOptions<$O, CommonPropKeys.$Options> = {}>`

⚗️ *transform*
🔢 *customizable*

Gets the common property keys of the elements in array `A`.

```ts
import { type ArrayPlus } from 'type-plus'

type R = ArrayPlus.CommonPropKeys<Array<{ a: 1 }>> // 'a'
type R = ArrayPlus.CommonPropKeys<Array<{ a: 1, b: 1 } | { a: 1, c: 1 }>> // 'a'

// customization
type R = ArrayPlus.CommonPropKeys<never, { $never: 1 }> // 1
```

### [`ArrayPlus.ElementMatch`](./array-plus.element-match.ts#l30)

`ArrayPlus.ElementMatch<T, Criteria, $O extends $StrictOptions<$O, ElementMatch.$Options> = {}>` — `$O`: `widen`, `$notMatch`, `$widen`, `$unionNotMatch`

🌪️ *filter*
🔢 *customizable*

Filter the element `T` in an array or tuple to match `Criteria`.

```ts
import type { ArrayPlus } from 'type-plus'

type R = ArrayPlus.ElementMatch<number, number> // number
type R = ArrayPlus.ElementMatch<1, number> // 1
type R = ArrayPlus.ElementMatch<number, string> // notMatch: never
type R = ArrayPlus.ElementMatch<number, 1> // widen: 1
type R = ArrayPlus.ElementMatch<number | string, number> // unionNotMatch: number

// customization
type R = ArrayPlus.ElementMatch<number, string, { $notMatch: 1 }> // 1
type R = ArrayPlus.ElementMatch<number, 1, { widen: false }> // never
type R = ArrayPlus.ElementMatch<number, 1, { $widen: never }> // never
type R = ArrayPlus.ElementMatch<number | string, number, { $unionNotMatch: undefined }> // number | undefined
```

### [`ArrayPlus.Entries`](./array-plus.entries.ts#L14)

> `ArrayPlus.Entries<A>`

Returns an array of key-value pairs for every entry in the array or tuple.

Note that this is not the same as `Array.entries(A)`,
which returns an iterable interator.

```ts
type R = ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>
type R = ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
```

### [`ArrayPlus.Filter`](./array-plus.filter.ts#l11)

`ArrayPlus.Filter<A, Criteria, $O extends $StrictOptions<$O, Filter.$Options> = {}>` — `$O`: `$notArray`

⚗️ *transform*
🔢 *customizable*

Filter the array `A`, keeping entries satisfying `Criteria`.

```ts
type R = Filter<Array<string | undefined>, string> // string[]

// customization
type R = Filter<never, string, { $never: 1 }> // 1
type R = Filter<['x'], string, { $notArray: 1 }> // 1
```

### [`ArrayPlus.Find`](./array-plus.find.ts#l49)

`ArrayPlus.Find<A, Criteria, $O extends $StrictOptions<$O, Find.$Options> = {}>` — `$O`: `widen`, `$never`, `$notMatch`, `$tuple`, `$widen`, `$unionNotMatch`

🦴 *utilities*
🔢 *customizable*

Finds the type in array `A` that matches `Criteria`.

```ts
import type { ArrayPlus } from 'type-plus'

type R = ArrayPlus.Find<Array<string>, string> // string
type R = ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
type R = ArrayPlus.Find<Array<string | number>, number | string> // string | number
type R = ArrayPlus.Find<number[], 1> // widen: 1 | undefined
type R = ArrayPlus.Find<Array<string | number>, number> // unionNotMatch: number

type R = ArrayPlus.Find<string[], number> // never

// customization
type R = ArrayPlus.Find<number[], 1, { widen: false }> // never
type R = ArrayPlus.Find<number[], 1, { $widen: never }> // never
type R = ArrayPlus.Find<never, 1, { $never: 2 }> // 2
type R = ArrayPlus.Find<string[], number, { $notMatch: 2 }> // 2
type R = ArrayPlus.Find<[], 1, { $tuple: 2 }> // 2
type R = ArrayPlus.Find<Array<string | number>, number, { $unionNotMatch: undefined }> // number | undefined
```

### [`ArrayPlus.FindLast`](./find-last.ts#L17)

> `ArrayPlus.FindLast<A, Criteria>

Returns the last type in the array or tuple that matches the `Criteria`.

If the `Criteria` is not met, it will return `never'.

For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.

```ts
ArrayPlus.FindLast<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined

ArrayPlus.FindLast<[true, 123, 'x', 321], number> // 321
```

### [`ArrayPlus.IndexAt](./array-plus.index-at.ts#l53)

`ArrayPlus.IndexAt<A, N, $O extends $StrictOptions<$O, IndexAt.$Options> = {}>`

🦴 *utilities*
🔢 *customizable*

Gets the normalized index to access the element of an array or tuple.

```ts
type R = IndexAt<['a', 'b', 'c'], 2> // 2
type R = IndexAt<['a', 'b', 'c'], -2> // 1

type R = IndexAt<['a', 'b', 'c'], 3> // 3 (upper bound)
type R = IndexAt<['a', 'b', 'c'], -4> // 0 (lower bound)

type R = IndexAt<[], 0> // never
```

Each case can be overridden through `$O`:

| Option | Applies when | Default |
| --- | --- | --- |
| `$never` | `A` is `never` | `never` |
| `$array` | `A` is an array (not a tuple) | `N` |
| `$emptyTuple` | `A` is `[]` | `never` |
| `$upperBound` | `N` is past the upper bound | `A['length']` |
| `$lowerBound` | `N` is past the lower bound | `0` |

```ts
type R = IndexAt<never, 0, { $never: 'n' }> // 'n'
type R = IndexAt<string[], 0, { $array: 'a' }> // 'a'
type R = IndexAt<[], 0, { $emptyTuple: 'e' }> // 'e'
type R = IndexAt<[1], 1, { $upperBound: 'u' }> // 'u'
type R = IndexAt<[1], -2, { $lowerBound: 'l' }> // 'l'
```

### [`ArrayPlus.IsIndexOutOfBound](./array-plus.is-index-out-of-bound.ts#l42)

`ArrayPlus.IsIndexOutOfBound<A, N, $O extends $StrictOptions<$O, IsIndexOutOfBound.$Options> = {}>`

🎭 *predicate*
🔢 *customizable*

Is `N` an out of bound index of `A`.

```ts
type R = IsIndexOutOfBound<[1], 0> // false
type R = IsIndexOutOfBound<[1], -1> // false

type R = IsIndexOutOfBound<[1], 1> // true
type R = IsIndexOutOfBound<[1], -2> // true

type R = IsIndexOutOfBound<[1], 1, { selection: 'filter' }> // 1
type R = IsIndexOutOfBound<[1], 0, { $then: 'yes'; $else: 'no' }> // 'no'
```

### [`ArrayPlus.IsReadonly`](./array-plus.is-readonly.ts)

`ArrayPlus.IsReadonly<A, $O = {}>`

🎭 *predicate*
🔢 *customizable*

Checks if `A` is a readonly array or tuple.

```ts
type R = IsReadonly<readonly string[]> // true
type R = IsReadonly<readonly [1, 2, 3, 4, 5]> // true

type R = IsReadonly<[1, 2, 3, 4, 5]> // false
type R = IsReadonly<readonly string[] | number> // boolean

// customization
type R = IsReadonly<readonly string[], { $then: 1 }> // 1
type R = IsReadonly<string[], { $else: 1 }> // 1
type R = IsReadonly<number, { $else: 1 }> // 1
type R = IsReadonly<never, { $never: 1 }> // 1
type R = IsReadonly<readonly string[] | number[], { selection: 'filter' }> // readonly string[]
```

### [`ArrayPlus.Reverse`](./array-plus.reverse.ts#l14)

> `ArrayPlus.Reverse<A>`

Reverses the order of the array or tuple.

```ts
ArrayPlus.Reverse<[1, 2, 3]> // [3, 2, 1]
```

### [`ArrayPlus.SplitAt`](./array-plus.split-at.ts#L22)

`ArrayPlus.SplitAt<A, Index>`

⚗️ *transform*

Splits array or tuple `A` into two at the specified `Index`.

If the `Index` is out of bounds,
it will set to the boundary value.

It is the type level `splice()`.

```ts
SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
SplitAt<[1, 2, 3, 4, 5], -3> // [[1, 2], [3, 4, 5]]

SplitAt<[1, 2, 3, 4, 5], 2, 2> // [[1, 2, 5], [3, 4]]

SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']> // [[1, 2, 'a', 'b', 5], [3, 4]]

// out of bound resets to boundary
SplitAt<[1, 2, 3, 4, 5], 6> // [[1, 2, 3, 4, 5], []]
SplitAt<[1, 2, 3, 4, 5], -6> // [[], [1, 2, 3, 4, 5]]
```

### [`ArrayPlus.Some`](./some.ts#L23)

> `ArrayPlus.Some<A, Criteria, $O extends $StrictOptions<$O, Some.$Options> = {}>`

Determines whether the array type `A` contains any elements that satisfies the specified `Criteria` type.

It operates in `loose` mode by default,
which means literal types satisfies their widened counterparts.
You can also change it to `strict` mode with `{ mode: 'strict' }`.

```ts
Some<string[], string> // true
Some<['a', boolean], boolean> // true
Some<['a', true], boolean> //true

Some<['a', true], boolean, { mode: 'strict' }> // false
```

Before 8.0.0, `Mode` was the third positional parameter, with `Then` and `Else` after it; move them
into `{ mode, $then, $else }`.

## Builtin array methods

JavaScript has many builtin array methods.
We will try to bring them to the type-level.

Not all methods can be implemented in the type-level,
or in the same way.

For example, type-level does not support higher-level generics,
i.e. it is not possible to pass in a generic type and "invoke" it.

Therefore, methods like `map` and `reduce()` cannot be implemented generically.
They have to be implemented separately for each specific use case,
or with reduced capability.

They are exposed under the `ArrayPlus` namespace,
while some common ones are exposed at top-level.

Here are the list of array methods and their corresponding type-level functions, if available.

✅ means it is implemented.
✴️ means it is implemented with reduced functionality
🧬 means there is a built-in mechanism or type for it.

- ✅ `at`: [`ArrayPlus.At`](#arrayplusat)
- ✅ `concat`: 🗑️ removed in 8.0.0, use `[...A, ...B]`
- 🚧 `copyWithin`:  `CopyWithin<A, Target, Start, End>`
- ✴️ `entries`: [`ArrayPlus.Entries`](#arrayplusentries)
- 🚧 `every`: `Every<A, Criteria, Then = A, Else = never>`
- 🚧 `fill`: `Fill<A, V, Start, End>`
- ✴️ `find`: [`FindFirst` | `ArrayPlus.Find`](#arrayplusfind)
  - ✴️ [`FindLast` | `ArrayPlus.FindLast`](#arrayplusfindlast)
- 🚧 `findIndex`: `FindIndex<A, Criteria> => number | number literal | never`
- 🚧 `flat`: `Flat<A>`
- 🚧 `flatMap`: `Flat<A, Criteria, R>`
- 🚧 `includes`:
- 🚧 `join`:
- 🚧 `keys`: `Range<0, T['length']>`?
- 🚧 `map`: `Map<A, Criteria, R>`
- 🚧 `pop`: `Pop<A>`
- 🧬 `push`: `[...A, T]`
- 🚧 `reduce`:
- 🚧 `reduceRight`:
- ✅ `reverse`: [`ArrayPlus.Reverse`](#arrayplusreverse)
- 🚧 `shift`:
- 🚧 `slice`:
- ✴️ `some`: [`Some` | `ArrayPlus.Some`](#arrayplussome)
- 🚧 `sort`:
- ✴️ `splice`: [`ArrayPlus.SplitAt`](#arrayplussplitat)
- 🧬 `unshift`: `[T, ...A]`
- 🧬 `values`: `keyof A`

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
[tuple]: ../tuple/readme.md
[union]: ../union/readme.md
