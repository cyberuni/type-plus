# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]

More than 200 type utilities for [TypeScript] for applications, library, and type-level programming.

[type-plus readme](./packages/type-plus/readme.md)

## v8

`type-plus` 8.0 is a major release. It needs TypeScript 5.4 or later, and Node.js 20 or later
for the runtime functions.

```sh
npm install type-plus
```

To upgrade from v7, follow the [v7 to v8 migration guide](https://cyberuni.github.io/type-plus/guides/migrating-to-v8/).
It lists every breaking change with a before and after example.
See [What's new in 8.0](./packages/type-plus/readme.md#whats-new-in-80) for a summary.

## Contribute

```sh
# after fork and clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

[codecov_image]: https://codecov.io/gh/cyberuni/type-plus/branch/main/graph/badge.svg
[codecov_url]: https://codecov.io/gh/cyberuni/type-plus
[downloads_image]: https://img.shields.io/npm/dm/type-plus.svg?style=flat
[github_action_url]: https://github.com/cyberuni/type-plus/actions
[github_release]: https://github.com/cyberuni/type-plus/workflows/release/badge.svg
[npm_image]: https://img.shields.io/npm/v/type-plus.svg?style=flat
[npm_url]: https://npmjs.org/package/type-plus
[TypeScript]: https://www.typescriptlang.org
[vscode_image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode_url]: https://code.visualstudio.com/
