# Contributing to type-plus

Thanks for taking the time to help. Every contribution counts, from a typo fix to a new type.

This guide gets you from a fresh clone to a merged pull request. The full set of house rules lives in
[`AGENTS.md`](../AGENTS.md); you do not need to read it before your first change.

## Ways to help

- **Report a bug.** Open an [issue](https://github.com/cyberuni/type-plus/issues) with the smallest
  code that shows it, and the TypeScript version you use. A
  [TypeScript Playground](https://www.typescriptlang.org/play) link is the fastest way to show it.
- **Fix the docs.** Each page on the [website](https://cyberuni.github.io/type-plus/) has an
  "Edit page" link at the bottom.
- **Fix a type or add one.** For a new type, open an issue first so we can agree on its name and
  behavior before you write it.

## Set up

You need Node.js 24 and pnpm 12. If you use [mise](https://mise.jdx.dev), `mise install` gets both.
Otherwise, `corepack enable` gives you the pnpm version the repo pins.

```sh
# after you fork the repo
git clone https://github.com/<your-name>/type-plus.git
cd type-plus
pnpm install
```

The repo ships VS Code settings and recommended extensions in `.vscode/`. VS Code offers to install the
extensions when you open the folder.

## Find your way around

| Path                         | What is there                                               |
| ---------------------------- | ----------------------------------------------------------- |
| `packages/type-plus/src/`    | The library. One file per type, with its spec beside it.    |
| `apps/website/`              | The documentation site (Astro and Starlight).               |
| `.changeset/`                | Release notes waiting for the next release.                 |

`UnionKeys` shows the shape of every type in the library. `src/union-keys.ts` holds the type and its TSDoc:

```ts
/**
 * 🦴 *utilities*
 *
 * Gets the keys of every member of the union `T`.
 *
 * @example
 * ```ts
 * type R = UnionKeys<{ a: 1 } | { b: 2 }> // 'a' | 'b'
 * ```
 */
export type UnionKeys<T> = keyof T | (T extends unknown ? keyof T : never)
```

`src/union-keys.spec.ts` checks it:

```ts
import { it } from 'vitest'
import type { UnionKeys } from './index.js'
import { testType } from './testing/index.js'

it('gets the keys of an object', () => {
	testType.equal<UnionKeys<{ a: 1; b: 2 }>, 'a' | 'b'>(true)
})
```

A type spec fails at compile time, not at run time: a wrong type is a compile error in the spec.

## Make a change

1. Create a branch: `git checkout -b fix-union-keys`. Do not start a branch name with `docs/`;
   use `docs-<name>` instead.
2. Run the tests in watch mode while you work: `pnpm tp watch`.
3. Write or change the type, and its spec next to it.
4. Document the type in TSDoc, with an `@example`. Add a `testType.equal` for the example to the
   spec, so the example cannot drift from the type.
5. A new public type also needs a line in `packages/type-plus/src/index.ts`.

A few naming rules that reviews catch most often:

- Name a file in kebab-case after its main export: `find-last.ts` for `FindLast`.
- Title-case acronyms: `IsBigint` and `JsonTypes`, not `IsBigInt` or `JSONTypes`.
- Prefix internal helpers with `_` (`_union-to-intersection.ts`), and never export them from an entry.

## Check your work

```sh
pnpm verify
```

This is the same check CI runs. It compiles the type tests against TypeScript 5.4, 5.5, 5.6, 6.0 and 7,
because a type that works on one version can break on another. To run only the type tests:

```sh
pnpm tp test:type
```

If you changed an error message that type-plus produces on purpose, update its snapshot and commit
the result:

```sh
pnpm tp test:errors --update
```

To preview the documentation site, run `pnpm web dev`.

## Open a pull request

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org). A git hook checks
each one, so a malformed message is rejected when you commit.

```sh
git commit -m "fix(type-plus): keep optional keys in UnionKeys"
git commit -m "feat(type-plus): add FindLast"
git commit -m "docs(website): explain distributive types"
```

If your change affects the published package, add a changeset. It writes the release note:

```sh
pnpm cs
```

Pick `type-plus`, choose the bump (`patch` for a fix, `minor` for a new type), and write one or two
sentences for users. Changes to the website or to tests only need no changeset.

Then push your branch and open a pull request. CI runs `pnpm verify`, and a maintainer reviews it.
If something is unclear, ask in the pull request; questions are welcome.

## Icons in TSDoc

Each type's TSDoc starts with an icon that tells its category.

- 👽 *alias* (:alien:): Alias of another type
- 🚦 *assertion* (:vertical_traffic_light:): assertion function
- 💀 *deprecated* (:skull:): deprecated and will be removed soon
- 🛡️ *guard* (:shield:): type guard function
- 💥 *immediate* (:boom:): The effect of the type can be observed immediately during development
- 🏃 *runtime* (:runner:): The function has runtime effect
- 🩳 *shortcut* (:shorts:): Shortcut or convenient types
- 🧪 *testing* (:test_tube:): The type or function are designed for test
- ⚗️ *transform* (:alembic:): These types transforms the input to another category
- 🧰 *type util* (:toolbox:): types for building types
- 🦴 *utilities* (:bone:): provide various functionalities (other icons considered: 🔧🔨)

### 🌪️ *filter*

`:tornado:`

This icon indicates that the type is a filter, or filter by default.

*filter* type is also known as *parse* type, as in [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

These types perform some kind of test.
If the input passes the test, the input is returned.
Otherwise, it returns `never`.

The returned input can be narrowed if the type is 🔀 *distributive*.

This means it is better to infer the return type instead of reusing the input type:

```ts
type IsUndefined<T> = T extends undefined ? T : never

// yes, these are silly, but just an example
type Bad<T> = IsUndefined<T> extends T ? T : never
type Good<T> = IsUndefined<T> extends infer R ? R : never

type R1 = Bad<undefined | number> // undefined | number
type R2 = Good<undefined | number> // undefined
```

(other icons considered: ↪️👉🚋⏩🐾🔑🚪💂🧲🙅‍♂️🪚)

### 🎭 *predicate*

`:performing_arts:`

This icon indicates that the type is a predicate, or predicate by default.

*predicate* type is also known as *validate* or *logical* type.
These types perform some kind of test.
If the input passes the test,
it returns `true` or `false`

(other icons considered: ⭕)

### 🔀 *distributive*

`:twisted_rightwards_arrows:`

This icon indicates that the type is distributive, or distributive by default.

This means each value in an union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```
