---
'type-plus': patch
---

Ship a generated `llms.txt`.

`llms.txt` is the orientation layer for an agent meeting the library cold: what
`type-plus` is, the `Is*` / `$Options` / `$Branch` conventions that govern nearly
every type in it, and which families exist. Per-symbol detail stays in the
`.d.ts`, which the agent already has.

The file is generated from the exported surface of `src/index.ts` by
`scripts/generate-llms-txt.mjs`, never hand-written, and `pnpm docs:llms:check`
fails the build when it drifts. It is listed in `files`, so it reaches
`node_modules/type-plus/llms.txt`, and it is also published to
`https://cyberuni.github.io/type-plus/llms.txt`.
