---
title: Node.js
description: Narrow an unknown error to a Node.js system error by its code.
sidebar:
  order: 15
---

Node.js reports operating-system failures as an `Error` carrying a `code` property, and adds extra
properties depending on which failure it was. TypeScript types those errors as `unknown` in a `catch`
clause, so recovering the code means asserting it. The `nodejs` category does that assertion once.

## `isSystemError`

```ts
function isSystemError<C extends SystemErrorCodes>(code: C, err: unknown): err is SystemErrors[C]
```

🛡️ *type guard* — narrows `err` to the error shape that `code` names.

```ts
import { isSystemError } from 'type-plus'

try {
	readConfig()
} catch (err) {
	if (isSystemError('ENOENT', err)) {
		err.path // string, narrowed
		return defaults
	}
	throw err
}
```

The check is `err.code === code`. That is the whole test, so a thrown object that merely carries a
matching `code` also passes. It is enough for errors that came out of Node.

## `SystemErrors`

```ts
type SystemErrors = {
	EACCES: Error & { code: 'EACCES' }
	EADDRINUSE: Error & { code: 'EADDRINUSE' }
	ENOENT: Error & { code: 'ENOENT'; path: string }
	// ...
}
```

🧰 *type util* — the codes this package knows, mapped to the shape each error arrives as.

A few entries carry the extra properties Node attaches: `ENOENT` also has `path`, and `EACCES` and
`EADDRINUSE` carry their literal `code`. The rest are plain `Error`, so narrowing tells you which failure
it was without promising fields that are not there.

```ts
import type { SystemErrors } from 'type-plus'

type R = SystemErrors['ENOENT'] // Error & { code: 'ENOENT'; path: string }
```

The list is not complete. It covers `EACCES`, `EADDRINUSE`, `ECONNREFUSED`, `ECONNRESET`, `EEXIST`,
`EISDIR`, `EMFILE`, `ENOENT`, `ENOTDIR`, `ENOTEMPTY`, `ENOTFOUND`, `EPERM`, `EPIPE` and `ETIMEDOUT`, and
grows as codes are needed. Contributions welcome.

## `SystemErrorCodes`

```ts
type SystemErrorCodes = keyof SystemErrors
```

🧰 *type util* — the union of the codes `SystemErrors` covers, which is the set `isSystemError` accepts.

```ts
import type { SystemErrorCodes } from 'type-plus'

type R = 'ENOENT' extends SystemErrorCodes ? true : false // true
type R = 'EDQUOT' extends SystemErrorCodes ? true : false // false
```

Passing a code that is not in the list is a compile error, which is deliberate: a typo in an error code is
otherwise a branch that silently never runs.

## Reference

| Symbol | Description |
| --- | --- |
| `isSystemError(code, err)` | narrows `err` to `SystemErrors[code]` |
| `SystemErrors` | the known codes mapped to their error shapes |
| `SystemErrorCodes` | `keyof SystemErrors` |

Source: [`src/nodejs`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/nodejs).
