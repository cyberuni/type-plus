---
'type-plus': minor
---

Rename `JSONTypes`, `JSONPrimitive`, `JSONObject` and `JSONArray` to `JsonTypes`, `JsonPrimitive`, `JsonObject` and `JsonArray`.

`type-plus` title-cases acronyms (`IsBigint`, `StringToBigint`), and the JSON types were the exception.
The old names remain as deprecated aliases of the same types and will be removed in 9.0.

Migration: replace `JSONTypes` with `JsonTypes`, and so on for the other three.
