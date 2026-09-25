---
'type-plus': major
---

Rename `$ExtractManipulatedString` to `ExtractManipulatedString`.

A leading `$` marks the type-branching machinery (`$Then`, `$Else`, `$Selection`, `X.$Options`).
`ExtractManipulatedString` is a string util that takes no part in it, so the prefix misled.
The type is new in 8.0, so no stable release is affected.

Migration: replace `$ExtractManipulatedString<T>` with `ExtractManipulatedString<T>`.
