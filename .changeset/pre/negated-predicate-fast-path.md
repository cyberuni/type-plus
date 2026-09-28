---
'type-plus': patch
---

`IsNotAny`, `IsNotNever`, `IsNotUnknown`, `IsNotVoid`, `IsNotObject`, `IsNotString` and
`NotAssignable` skip the options machinery when called without options, like their positive
counterparts. Results are unchanged.

Instantiations per use without options (TypeScript 6.0 and 7, 300 distinct inputs):

| Type | Before | After |
| --- | ---: | ---: |
| `IsNotAny` | 29 | 10 |
| `IsNotNever` | 29 | 13 |
| `IsNotUnknown` | 29 | 12 |
| `IsNotVoid` | 68 | 23 |
| `IsNotObject` | 61 | 25 |
| `IsNotString` | 59 | 24 |
| `NotAssignable` | 67 | 39 |

"Before" already includes the cheaper `$Special` guards from the same release. On 8.0.0-beta.11 each
type cost 1.5 to 2 times its "Before" figure.
