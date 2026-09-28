---
'type-plus': patch
---

Honor the special-type branch options in `IsPositive`, `IsNegative`, `IsInteger`, `IsNotPositive`, `IsNotNegative` and `IsNotInteger`.

They declared `$any`, `$unknown`, `$never` and `$void` but ignored them. Passing one now overrides that branch:

```ts
type R = IsPositive<any, { $any: 1 }> // was false, now 1
type R = IsNotInteger<never, { $never: 3 }> // was true, now 3
```

Without these options the results are unchanged.
