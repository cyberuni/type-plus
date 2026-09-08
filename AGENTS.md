# AGENTS.md

`type-plus` is a TypeScript type-level library: most of what it ships are types that resolve at
compile time and emit no runtime code.

## Verification

CI runs exactly `pnpm install` then `pnpm verify`. The workflow calls a reusable workflow in
`cyberuni/.github` and names no script itself, so `pnpm verify` locally is the gate.

`pnpm knip` fails on a clean `main` with pre-existing findings and is not part of `verify`. Do not
try to fix it and do not read it as a regression.

Type tests compile the suite against TypeScript 5.4, 5.5, 5.6, 6.0 and 7
(`pnpm --filter type-plus test:type`). A change that passes on one version can fail on another; run
all five.

## Writing types

Comments on types are erased from the JavaScript emit and survive only in the `.d.ts`, which never
enters a consumer bundle. Documenting a type is free for consumers — document heavily in TSDoc.

Every `@example` in a family is pinned to the implementation by `src/<family>/<family>_docs.spec.ts`
with `testType.equal`. Changing a documented example without updating its pin fails the type tests;
adding examples to a family that has no such file means creating one.

Documentation has three homes, in descending order of trust: TSDoc on the declaration,
`apps/website/src/content/docs/`, and the legacy `src/<family>/readme.md` tree. The last is the rot
risk — #667 deleted 13 of its 33 pages for documenting types that no longer existed, and the
surviving 20 are still linked from `packages/type-plus/readme.md`, so they are live and still drift.
Prefer the first two; when you rename or remove an export, grep the readme tree for it.

## Node scripts

`typescript` is v7, whose npm package exposes only `version` to JS consumers. A script that needs the
compiler API must import `ts-6.0`, the pinned alias already present for the type tests.

## Git

A remote branch named literally `docs` occupies that ref namespace on `origin`, so `docs/<name>`
branches are rejected on push. Use `docs-<name>`.

<!-- buddy-agent-harness:begin -->

Skills are canonical in `.agents/skills/` — create and edit them there. `.claude/skills/` is a
generated bridge to it; never write to it directly. `CLAUDE.md` is a generated pointer to this file.
Shared instructions belong here; keep only Claude-specific notes there.

<!-- buddy-agent-harness:end -->
