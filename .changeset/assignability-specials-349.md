---
'type-plus': major
---

Answer `any`, `unknown`, `never` and `void` with TypeScript's own assignability relation in
`CanAssign`, `IsAssign`, `StrictCanAssign`, `Assignable` and `NotAssignable`.

`CanAssign<A, B>` was a bare `A extends B` behind a `boolean` guard. `extends` is not
assignability: it gets all three special types wrong, and `boolean extends A` swallowed `any`
and `unknown` on the way past. The rule now applied everywhere is the compiler's:

- `any` is assignable to every type except `never`, and every type is assignable to `any`.
  The relation is **symmetric** for `any`, exactly as it is in TypeScript — both
  `const b: number = a` and `const c: any = n` compile.
- `unknown` is the top type: everything is assignable to it, and it is assignable only to
  `any` and `unknown`.
- `never` is the bottom type: it is assignable to everything, and nothing but `never` is
  assignable to it.
- `void` is not special to the relation and is answered structurally.

Before / after:

```ts
type R = CanAssign<any, number> // was false,  now true    <- #349
type R = CanAssign<never, any> // was never,  now true
type R = CanAssign<never, number> // was never,  now true
type R = CanAssign<never, unknown> // was never,  now true
type R = CanAssign<never, never> // was never,  now true

type R = StrictCanAssign<unknown, number> // was true,   now false
type R = Assignable<unknown, 1> // was true,   now false
type R = NotAssignable<unknown, 1> // was false,  now true

type R = Assignable<1, void> // was true,   now false
type R = Assignable<void, 1> // was true,   now false
type R = NotAssignable<undefined, void> // was true,   now false
```

`Assignable` and `NotAssignable` had no `$void` branch at all, so a `void` on either side fell
through `$Special` to an unconditional `$then`. That is why the two of them, which are supposed to
be complements, both answered `true` for `<1, void>` and both answered `true` for `<undefined, void>`.

Unchanged: distribution over unions (`CanAssign<number | string, number>` is still `boolean`),
the `boolean` special case (`CanAssign<boolean, false>` is still `false`), the `$any` / `$unknown`
/ `$never` branch overrides, and `Assignable.$` / `IsExtend`, which remain the raw
`A extends B` forms for anyone who wants the unadorned behavior.

Closes [#349](https://github.com/unional/type-plus/issues/349).
