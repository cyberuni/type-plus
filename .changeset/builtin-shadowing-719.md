---
'type-plus': minor
---

Add `ObjectPlus.Partial`, `ObjectPlus.Required`, `ObjectPlus.Pick` and `ObjectPlus.Omit`, and deprecate
the top-level `Partial`, `Required`, `Pick` and `Omit` (#719).

The top-level names shadow the TypeScript built-ins of the same name, but they mean something else.
An editor's auto-import can bring one in, and from then on every use of that name in the file
switches meaning without an error:

- `Required` also strips `undefined` from properties that were already required:
  `{ b: string | undefined }` becomes `{ b: string }`. The built-in only removes the `?`.
- `Pick` and `Omit` distribute over a union `T` and accept the keys of any member. The built-ins work
  on the keys every member shares, so `Omit<{ k: 'x'; x: 1 } | { k: 'y'; y: 2 }, 'k'>` is
  `{ x: 1 } | { y: 2 }` here and `{}` with the built-in.
- `Partial` adds `| undefined` to each property. It differs from the built-in only under
  `exactOptionalPropertyTypes`.

In the `ObjectPlus` namespace they no longer shadow anything. Each type's TSDoc names its
difference from the built-in. The top-level names remain as deprecated aliases of the same types,
and will be removed in a later release.

`Exclude` keeps its top-level name. With two arguments it is identical to the built-in, so shadowing
it changes nothing; `$O['$excluded']` only adds behavior.

Migration:

| Before | After |
| --- | --- |
| `import type { Pick } from 'type-plus'` | `import type { ObjectPlus } from 'type-plus'`, then `ObjectPlus.Pick<T, K>` |
| `Omit<T, K>` from `type-plus` | `ObjectPlus.Omit<T, K>` |
| `Partial<T>` from `type-plus` | `ObjectPlus.Partial<T>` |
| `Required<T>` from `type-plus` | `ObjectPlus.Required<T>` |

Do not just delete the import: the file then compiles against the built-in, which gives different
results in the cases above.
