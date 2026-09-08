# Tuple

In TypeScript, the type of an JavaScript array can be an [array](../array/readme.md) or a [tuple](#tuple).

A *tuple type* is an array with fixed number of entries.
Each entry in the *tuple* is specified explicitly.

## Type Checking

`IsTuple<T>` and `IsNotTuple<T>` check whether `T` is a tuple, excluding array.

### [IsTuple](./is_tuple.ts)

`IsTuple<T, $O extends IsTuple.$Options = {}>`

🎭 *predicate*

Validate that `T` is a tuple, excluding array.

```ts
import type { IsTuple } from 'type-plus'

type R = IsTuple<[]>       // true

type R = IsTuple<number[]> // false
type R = IsTuple<string>   // false
type R = IsTuple<never>    // false
type R = IsTuple<unknown>  // false
```

🌪️ *filter*

Pass `{ selection: 'filter' }` to get `T` back instead of a boolean:

```ts
type R = IsTuple<[], { selection: 'filter' }>       // []
type R = IsTuple<[1], { selection: 'filter' }>      // [1]

type R = IsTuple<never, { selection: 'filter' }>    // never
type R = IsTuple<unknown, { selection: 'filter' }>  // never
```

The `$any`, `$unknown`, `$never` and `$void` branches are overridable through the same options
object. See [type branching](https://cyberuni.github.io/type-plus/api/type-branching/).

### [IsNotTuple](./is_not_tuple.ts)

`IsNotTuple<T, $O extends IsNotTuple.$Options = {}>`

🎭 *predicate*

Validate that `T` is not a tuple, excluding array.

```ts
import type { IsNotTuple } from 'type-plus'

type R = IsNotTuple<[]>       // false
type R = IsNotTuple<[1]>      // false

type R = IsNotTuple<number[]> // true
type R = IsNotTuple<string>   // true
type R = IsNotTuple<never>    // true
type R = IsNotTuple<unknown>  // true
```

## [CommonPropKeys](./common_prop_keys.ts#l22)

`CommonPropKeys<T extends Record[], Options = { $never }>`

⚗️ *transform*
🔢 *customizable*

Gets the common property keys of the elements in tuple or array `T`.

```ts
import { CommonPropKeys } from 'type-plus'

type R = CommonPropKeys<[{ a: 1, c: 1 }, { b: 1, c: 2 }]> // 'c'
type R = CommonPropKeys<[{ a: 1 }, { b: 1 }]> // never
type R = CommonPropKeys<Array<{ a: 1, b: 1 } | { a: 1, c: 1 }>> // 'a'
type R = CommonPropKeys<[{ a: 1 }, { b: 1 }]> // never
type R = CommonPropKeys<never> // $never: never

// customization
type R = CommonPropKeys<never, { $never: 1 }> // 1
```

## [DropFirst](./drop.ts#l26)

`DropFirst<T extends unknown[], Options = { $array, caseEmptyTuple }>`

⚗️ *transform*
🔢 *customizable*

Drops the first entry in the tuple `T`.

```ts
import { DropFirst } from 'type-plus'

type R = DropFirst<[1, 2, 3]> // [2, 3]
type R = DropFirst<[string]> // []
type R = DropFirst<string[]> // $array: string[]
type R = DropFirst<[]> // caseEmptyTuple: []

// customization
type R = DropFirst<string[], { $array: 1 }> // 1
type R = DropFirst<[], { caseEmptyTuple: 1 }> // 1
```

## [DropLast](./drop.ts#l72)

`DropLast<T extends unknown[], Options = { array, empty_tuple }>`

⚗️ *transform*
🔢 *customizable*

Drops the last entry in the tuple `T`.

```ts
import { DropLast } from 'type-plus'

type R = DropLast<[1, 2, 3]> // [2, 3]
type R = DropLast<[string]> // []
type R = DropLast<string[]> // $array: string[]
type R = DropLast<[]> // caseEmptyTuple: []

// customization
type R = DropLast<string[], { $array: 1 }> // 1
type R = DropLast<[], { caseEmptyTuple: 1 }> // 1
```

## [DropMatch](./drop.ts)

`DropMatch<A extends Readonly<Array<unknown>>, Criteria>`

⚗️ *transform*

Drops entries matching `Criteria` in array or tuple `A`.

```ts
type R = DropMatch<Array<string | undefined>, undefined> // string[]
type R = DropMatch<Array<string>, string> // never[]
type R = DropMatch<Array<1 | 2>, number> // never[]
```

## [TuplePlus](./tuple_plus.ts)

`TuplePlus` contains type utilities specific for *tuple*.
The input type are not checked and assumed to be *tuple*.

## [TuplePlus.CommonPropKeys](./tuple_plus.common_prop_keys.ts#l22)

`TuplePlus.CommonPropKeys<T extends Record[], Options = { $never }>`

⚗️ *transform*
🔢 *customizable*

Gets the common property keys of the elements in tuple `T`.

```ts
import { type TuplePlus } from 'type-plus'

type R = TuplePlus.CommonPropKeys<[{ a: 1, c: 1 }, { b: 1, c: 2 }]> // 'c'
type R = TuplePlus.CommonPropKeys<[{ a: 1 }, { b: 1 }]> // never
type R = TuplePlus.CommonPropKeys<Array<{ a: 1, b: 1 } | { a: 1, c: 1 }>> // 'a'
type R = TuplePlus.CommonPropKeys<[{ a: 1 }, { b: 1 }]> // never
type R = TuplePlus.CommonPropKeys<never> // $never: never

// customization
type R = TuplePlus.CommonPropKeys<never, { $never: 1 }> // 1
```

### [TuplePlus.Filter](./tuple_plus.filter.ts)

`TuplePlus.Filter<T, Criteria>`

⚗️ *transform*

Filter entries matching `Criteria` in tuple `T`.

```ts
import { TuplePlus } from 'type-plus'

type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
```

### [`TuplePlus.Find`](./tuple_plus.find.ts#l51)

`TuplePlus.Find<A, Criteria, Options { widen, $array, caseEmptyTuple, $never, $notMatch, $widen, $unionNotMatch }>`

🦴 *utilities*
🔢 *customizable*

Finds the type in tuple `A` that matches `Criteria`.

```ts
import type { TuplePlus } from 'type-plus'

type R = TuplePlus.Find<[true, 1, 'x', 3], string> // 'x'
type R = TuplePlus.Find<[true, 1, 'x', 3], number> // 1
type R = TuplePlus.Find<[string, number, 1], 1> // widen: 1 | undefined
type R = TuplePlus.Find<[true, number | string], string> // unionNotMatch: string

type R = TuplePlus.Find<[true, 1, 'x'], 2> // never

// customization
type R = TuplePlus.Find<[number], 1, { widen: false }> // never
type R = TuplePlus.Find<[number], 1, { $widen: never }> // never
type R = TuplePlus.Find<string[], 1, { $array: 2 }> // 2
type R = TuplePlus.Find<[], 1, { caseEmptyTuple: 2 }> // 2
type R = TuplePlus.Find<never, 1, { $never: 2 }> // 2
type R = TuplePlus.Find<[string], number, { $notMatch: 2 }> // 2
type R = TuplePlus.Find<[string | number], number, { $unionNotMatch: undefined }> // number | undefined
```

### [TuplePlus.PadStart](./tuple_plus.pad_start.ts)

`TuplePlus.PadStart<T, MaxLength, PadWith>`

⚗️ *transform*

Pad `T` with `PadWith` at the start of the tuple.

If the `MaxLength` is less than the length of the tuple,
the `Tuple` will be returned unchanged.

```ts
PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]

// Ignore if MaxLength is less than the length of the tuple
PadStart<[1, 2, 3], 2> // [1, 2, 3]

// Default to unknown
PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
