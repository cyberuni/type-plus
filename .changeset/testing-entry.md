---
"type-plus": major
---

Move `testType` and `stub` to the `type-plus/testing` entry. `type-plus` no longer exports them, so production code does not pay to parse them or see them in auto-import.

Migration:
- Replace `import { stub, testType } from 'type-plus'` with `import { stub, testType } from 'type-plus/testing'`.
- Under `moduleResolution: "node"`, the `typesVersions` field resolves the types of `type-plus/testing`.
