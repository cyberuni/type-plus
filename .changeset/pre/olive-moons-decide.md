---
'type-plus': minor
---

Deprecate `NotExtendable`, `IsExtend` and `IsNotExtend`, completing the group
`Extendable` already belonged to. Nothing is removed and no behavior changes;
each type now names its replacement.

| Deprecated | Use instead |
| --- | --- |
| `IsExtend<A, B, Then, Else>` | `Assignable.$<A, B, { $then: Then; $else: Else }>` |
| `IsNotExtend<A, B, Then, Else>` | `NotAssignable.$<A, B, { $then: Then; $else: Else }>` |
| `Extendable<A, B>` | `Assignable.$<A, B, { selection: 'filter' }>` |
| `NotExtendable<A, B>` | `NotAssignable.$<A, B, { selection: 'filter' }>` |

`#665` names the replacement as `$Assignable`, which does not exist. The `$`
type util hanging off `Assignable` and `NotAssignable` is the equivalent, and
the mapping above is pinned by compiled assertions in
`src/predicates/predicates_docs.spec.ts` rather than asserted.

⚠️ Migrating to plain `Assignable`/`NotAssignable` instead of the `$` member is
**not** a rename. The plain types special-case `any`, `never` and `unknown`, so
three inputs change answer:

```ts
IsExtend<any, number> // boolean
Assignable<any, number> // true
Assignable.$<any, number, {}> // boolean -- the equivalent
```

`Assignable.$` also requires its options argument explicitly (`{}` at minimum),
and supports `{ distributive: false }`, which the deprecated four cannot
express.
