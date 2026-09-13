---
'type-plus': patch
---

Answer `IsAny`, `IsNever`, `IsUnknown`, `IsObject`, `IsString` and `Assignable` directly when they
are called without options, skipping the options machinery. Results are unchanged; one use costs
about a fifth of the type instantiations it did (TypeScript 6.0 and 7, 300 distinct inputs):

| Type | Before | After |
| --- | ---: | ---: |
| `IsAny` | 52 | 10 |
| `IsNever` | 53 | 13 |
| `IsUnknown` | 52 | 12 |
| `IsObject` | 101 | 19 |
| `IsString` | 97 | 19 |
| `Assignable` | 123 | 26 |

Calls that pass any option still take the full path.
