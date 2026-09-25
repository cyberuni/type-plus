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

`pnpm --filter type-plus test:errors` pins the text of the errors type-plus produces, which
`@ts-expect-error` cannot: it compiles `packages/type-plus/error-snapshots/probes.ts` on all five
compilers and diffs the output against `snapshot.txt`. When a change to an error is intended, run it
with `--update` and commit the new snapshot; a new probe case is one exported declaration there.

## Writing types

Comments on types are erased from the JavaScript emit and survive only in the `.d.ts`, which never
enters a consumer bundle. Documenting a type is free for consumers — document heavily in TSDoc.

A documented `@example` is pinned to the implementation by a compiled `testType.equal`, so an example
that drifts from the implementation fails the type tests. The pin belongs in the spec for the symbol
it documents, under the test that already covers that behavior — `src/utils/widen.spec.ts` for a
`Widen` example, not a separate file collecting a family's examples. Tests are organized by what they
check, never by where the claim came from.

Documentation has three homes, in descending order of trust: TSDoc on the declaration,
`apps/website/src/content/docs/`, and the legacy `src/<family>/readme.md` tree. The last is the rot
risk — #667 deleted 13 of its 33 pages for documenting types that no longer existed, and the
surviving 20 are still linked from `packages/type-plus/readme.md`, so they are live and still drift.
Prefer the first two; when you rename or remove an export, grep the readme tree for it.

### Names

- **Acronyms are title-cased**: `IsBigint`, `JsonTypes`, not `IsBigInt` or `JSONTypes`. The
  `JSON*` names survive only as deprecated aliases until 9.0.
- **`$` marks the type-branching machinery**: the types under `src/$type/` and the
  `X.$Options`, `X.$Default`, `X.$Branch` and `X.$Fn` members of a type's namespace. A type that
  takes no part in branching gets a plain name, wherever it lives.
- **`_` marks an implementation detail**: a `_Name` type or a `_name.ts` file is imported by its
  siblings and never reachable from `src/index.ts`. `src/index.surface.spec.ts` fails if a `_` name
  is reachable, but it cannot see a `_` file whose exports are unprefixed, so never re-export one.

### Files

A source file is named in kebab-case after its main export: `find-last.ts` for `FindLast`.

A dot in a source file name means one thing: `<namespace>.<member>.ts` holds a type that exists only
as a member of that namespace (`array-plus.entries.ts` for `ArrayPlus.Entries`, `bit.and.ts` for
`Bit.And`). A type that is also exported at the top level keeps its plain name, even when a namespace
aliases it too: `at.ts` holds `At`, which is also `ArrayPlus.At`.

A spec is named after its source file (`at.spec.ts`). A dot after that stem splits one source's
spec by aspect (`cast.numeric-to-string.spec.ts`). A `.tsNN.spec.ts` suffix ties a spec to one
compiler version's config. A spec with no source file pins built-in TypeScript behavior and is named
after what it pins (`array.push.spec.ts`).

### Exports

`src/index.ts` is the one list of what the package exports. There are no family barrels: every file
with a public export gets its own line there, in the path order biome keeps.

- Use `export type * from` when the file emits no runtime value, and `export * from` when it does.
- Use a named `export type { A, B } from` list when the file also exports names that must stay off
  the top level.
- A source file imports the file that declares what it needs, never `src/index.ts`. A spec imports
  the package entry (`../index.js`).

### Namespaces

`ArrayPlus`, `MathPlus`, `NumericPlus`, `ObjectPlus`, `StringPlus`, `TuplePlus` and `Bit` share one
shape. Copy it for a new namespace or a new member:

```ts
// src/array/array-plus.ts
import * as _at from './at.js'
import * as _entries from './array-plus.entries.js'

/** 🧰 *namespace* … TSDoc for the namespace goes here. */
export declare namespace ArrayPlus {
	export import At = _at.At
	export import Entries = _entries.Entries
}
```

```ts
// src/index.ts
export type { ArrayPlus } from './array/array-plus.js'
```

Each member lives in its own file and carries its own TSDoc; the namespace file only aliases them.
To add a member, add its file and one `export import` line. The shape is forced:

- TypeScript never attaches TSDoc to `export * as X`. A file-header comment, `@module`, or a comment on
  the `export * as` line all hover as nothing, so do not go back to it.
- The namespace imports each member file with `import * as`. An `import type` fails TS1380, and the
  value import is never loaded at runtime, because `src/index.ts` exports the namespace as a type.
- The namespace must be `declare`d, because a non-ambient one fails TS1269 under
  `verbatimModuleSyntax`. That makes it type-only, so consumers write
  `import type { ArrayPlus } from 'type-plus'`.

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
