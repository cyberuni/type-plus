---
'type-plus': major
---

Remove the top-level `Partial`, `Required`, `Pick` and `Omit` (#740).

**Breaking.** They shadowed the TypeScript built-ins of the same name while meaning something else,
and were deprecated aliases of the `ObjectPlus` forms. Replace each one:

| Removed | Replacement |
| --- | --- |
| `Partial<T>` | `ObjectPlus.Partial<T>` |
| `Required<T>` | `ObjectPlus.Required<T>` |
| `Pick<T, K>` | `ObjectPlus.Pick<T, K>` |
| `Omit<T, K>` | `ObjectPlus.Omit<T, K>` |

Import the namespace with `import type { ObjectPlus } from 'type-plus'`.

Do not just delete the import: the file then compiles against the built-in, which differs in the
cases the `ObjectPlus` TSDoc lists. `Required` also strips `undefined` from required properties,
`Pick` and `Omit` distribute over a union `T`, and `Partial` adds `| undefined` under
`exactOptionalPropertyTypes`.
