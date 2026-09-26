---
'type-plus': major
---

Remove `LooseArrayType`, `IsLooseArray`, `NotLooseArrayType` and `IsNotLooseArray`.

These were a stopgap added while `ArrayType` still did a strict, tuple-excluding
check (#330). `ArrayType` and its variances are gone in 8.0.0, and their
replacement `IsArray` is loose by default — a tuple is an array, the same way a
string literal is a `string` for `IsString`. That leaves the stopgap with nothing
to stop.

Migration:

| Removed | Replacement |
| --- | --- |
| `LooseArrayType<T>` | `IsArray<T, { selection: 'filter' }>` |
| `IsLooseArray<T>` | `IsArray<T>` |
| `NotLooseArrayType<T>` | `IsNotArray<T, { selection: 'filter' }>` |
| `IsNotLooseArray<T>` | `IsNotArray<T>` |

The filter form is not a literal drop-in: `IsArray` distributes over unions, so
`IsArray<number[] | 1, { selection: 'filter' }>` is `number[]`, where
`LooseArrayType<number[] | 1>` returned the whole `number[] | 1`.

For anyone who relied on the old strict `ArrayType` behaviour, that is
`IsArray<T, { exact: true }>` (`{ selection: 'filter', exact: true }` to filter).

`ArrayPlus.IsReadonly` is now built on `IsArray`; its behaviour is unchanged.
