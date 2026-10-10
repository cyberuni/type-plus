---
"type-plus": patch
---

Mark the `typescript` peer dependency as optional.

npm 7 and later install a required peer automatically, so every install of `type-plus`, including transitive ones from packages that only use its runtime functions, pulled in TypeScript 7 and its native compiler binary, about 30 MB.
The `>= 5.4.0` range still applies when TypeScript is installed.
