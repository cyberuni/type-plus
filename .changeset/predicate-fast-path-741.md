---
'type-plus': patch
---

The remaining predicates built on `$Special` skip the options machinery when called without options,
like `IsString` and `IsObject`. They answer through `$Special.Values`. Results are unchanged.

This covers the `array`, `bigint`, `boolean`, `function`, `null`, `number`, `symbol`, `tuple` and
`undefined` predicates, `ArrayPlus.IsReadonly`, `IsNumeric`, the numeric literal predicates, and the
string literal and template literal predicates, each with its `IsNot*` counterpart.

Instantiations per use without options (TypeScript 6.0, 300 distinct inputs; TypeScript 7 is within 2):

| Type | Before | After |
| --- | ---: | ---: |
| `IsReadonly` | 40 | 26 |
| `IsArray` | 63 | 23 |
| `IsNotArray` | 63 | 23 |
| `IsBigint` | 60 | 23 |
| `IsNotBigint` | 59 | 23 |
| `IsBigintLiteral` | 58 | 36 |
| `IsNotBigintLiteral` | 60 | 38 |
| `IsBoolean` | 60 | 23 |
| `IsNotBoolean` | 59 | 23 |
| `IsTrue` | 51 | 23 |
| `IsNotTrue` | 53 | 23 |
| `IsFalse` | 51 | 23 |
| `IsNotFalse` | 53 | 23 |
| `IsFunction` | 58 | 24 |
| `IsNotFunction` | 59 | 24 |
| `IsNull` | 51 | 23 |
| `IsNotNull` | 53 | 23 |
| `IsNumber` | 58 | 23 |
| `IsNotNumber` | 58 | 23 |
| `IsNumberLiteral` | 60 | 38 |
| `IsNotNumberLiteral` | 60 | 38 |
| `IsNumeric` | 52 | 23 |
| `IsNotNumeric` | 52 | 23 |
| `IsIntegerLiteral` | 84 | 62 |
| `IsNotIntegerLiteral` | 85 | 63 |
| `IsPositiveLiteral` | 84 | 62 |
| `IsNotPositiveLiteral` | 85 | 63 |
| `IsNegativeLiteral` | 84 | 62 |
| `IsNotNegativeLiteral` | 85 | 63 |
| `IsStringLiteral` | 67 | 39 |
| `IsNotStringLiteral` | 68 | 40 |
| `IsTemplateLiteral` | 74 | 45 |
| `IsNotTemplateLiteral` | 76 | 45 |
| `IsSymbol` | 51 | 23 |
| `IsNotSymbol` | 53 | 23 |
| `IsTuple` | 51 | 24 |
| `IsNotTuple` | 52 | 24 |
| `IsUndefined` | 51 | 23 |
| `IsNotUndefined` | 53 | 23 |
