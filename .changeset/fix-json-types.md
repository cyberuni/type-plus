---
"type-plus": major
---

Fix the JSON types and add `JsonCompatible`, `IsJson` and `IsNotJson`.

- `JsonArray` is readonly, so readonly arrays, tuples and `as const` data are accepted as `JsonTypes`.
- `JsonObject` rejects a property holding `undefined` (`{ a: undefined }`). An optional property (`{ a?: number }`) is still accepted. A read from it is `JsonTypes | undefined` under `noUncheckedIndexedAccess`, and `JsonTypes` without it.
- Add `JsonCompatible<T>`: constrain with `T extends JsonCompatible<T>` to accept any JSON-safe value, including an `interface`, which TypeScript never lets satisfy `JsonTypes`. The compiler error names the path of the part that is not JSON, such as `"not JSON at $.profile.createdAt"`.
- Add the `IsJson<T>` and `IsNotJson<T>` predicates, with the usual `selection`, `distributive` and branch options.
- Remove `JsonTypes.get` and the `JsonTypes` and `JSONTypes` values. `type-plus` only ever exported them as types, so they were unreachable. The deprecated `JSONTypes` type alias stays until 9.0.

Migration:
- Replace `JsonTypes.get<T>(obj, 'a', 'b')` with a plain property read and a cast.
- Replace a `T extends JsonTypes` constraint that has to accept interfaces with `T extends JsonCompatible<T>`.
