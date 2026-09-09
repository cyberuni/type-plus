# Mix Types

This folder contains types and utilities that work across multiple types.

## [IsAnyOrNever](./is_any_or_never.ts)

`IsAnyOrNever<T>` 🎭

Validate if `T` is either exactly `any` or exactly `never`.

🎭 *predicate*
🩳 *shortcut*

```ts
import type { IsAnyOrNever } from 'type-plus'

type R = IsAnyOrNever<any> // true
type R = IsAnyOrNever<never> // true

type R = IsAnyOrNever<unknown> // false
```

## [Box](./box.ts)

`Box<T, Options = { $notBoxable }>`

⚗️ *transform*
🔢 *customizable*

Converts primitive types to their boxed types.

`$notBoxable`: return type when `T` is not boxable. Defaults to `never`.

```ts
Box<number> // Number
Box<object> // Object
Box<string>  // String
Box<'abc'>  // String

Box<undefined> // never
```

## [Exclude](./exclude.ts)

`Exclude<T, U, R = never>`

A drop-in replacement of the build-in `Exclude<T, U>`.

Also support replacing `U` with `R`.

```ts
Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
Exclude<'a' | 'b' | 'c', 'a', 'd'> // 'b' | 'c' | 'd'
```

## [Merge](./merge.ts)

⚗️ *transform*
🔢 *customizable*

Merges type `A` and type `B`.

This type performs the same operations as `{ ...a, ...b }` but at the type level.

This is a more general type then `ObjectPlus.Merge<A, B>`,
which constraints `A` and `B` to be `Record`.

This type does not have such restrictions, and tries to handle the other types accordingly.
