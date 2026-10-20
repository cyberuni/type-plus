---
"type-plus": patch
---

Bring the readmes in line with 8.0.0.

- The package readme states the Node.js floor (20.19 or 22.12), the ESM-only build, the `type-plus/testing` entry and the `Json*` renames, and drops the pre-release wording.
- The `src/**/readme.md` pages correct examples whose results did not match the types, use `import type` for type-only names, and use the `$Never.$Options` names.
