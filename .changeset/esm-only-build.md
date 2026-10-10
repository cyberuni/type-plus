---
"type-plus": major
---

Ship ESM only. The CommonJS build in `cjs/` is gone, and so is the `require` export condition.

Both builds were about 4.5 MB each, so every install, including transitive ones, carried a second copy of the runtime.
`require('type-plus')` still works on Node.js 20.19 and later, and 22.12 and later, which load ES modules through `require()` without a flag.
`engines.node` now declares that floor: `^20.19.0 || >=22.12.0`.
