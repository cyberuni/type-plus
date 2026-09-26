---
'type-plus': major
---

Make the `ArrayPlus`, `MathPlus`, `NumericPlus`, `ObjectPlus`, `StringPlus`, `TuplePlus` and `Bit` namespaces show their TSDoc on hover.

Six of them were `export * as X` re-exports of a module. TypeScript never attaches a doc comment to such a namespace, so hovering `ArrayPlus` showed nothing. All seven are now declared namespaces whose members alias the types they group. The members are the same types as before.

**Breaking, for `verbatimModuleSyntax` only.** A declared namespace exists only at the type level, so the package no longer exports an (empty) runtime object for `ArrayPlus`, `MathPlus`, `NumericPlus`, `ObjectPlus` or `TuplePlus`. Under `verbatimModuleSyntax`, a value import of one now fails with TS1484. `StringPlus` and `Bit` already worked this way.

Migration: import them as types.

```ts
import type { ArrayPlus } from 'type-plus'
// or
import { type ArrayPlus, testType } from 'type-plus'
```
