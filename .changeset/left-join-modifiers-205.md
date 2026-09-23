---
'type-plus': patch
---

Keep the `?` and `readonly` modifiers of `A` in `LeftJoin`.

`LeftJoin<{ a?: number; b?: string }, { b: boolean }>` returned `{ a: number; b: boolean }`: the properties carried over from `A` lost their modifiers.
It now returns `{ a?: number; b: boolean }`, and a `readonly` property of `A` stays `readonly`.
On a key that both `A` and `B` declare, `B` still wins the type and the modifiers.
