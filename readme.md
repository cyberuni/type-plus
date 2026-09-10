# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]

More than 200 type utilities for [TypeScript] for applications, library, and type-level programming.

[type-plus readme](./packages/type-plus/readme.md)

## v8 beta status

`type-plus` v8 is in active development again, published under the `beta` dist-tag
(currently `8.0.0-beta.11`). Breaking changes are expected between beta releases.

If you are on the beta and want a stable install, pin the exact version and upgrade
deliberately:

```sh
npm install type-plus@8.0.0-beta.11 --save-exact
```

Otherwise, stay on the latest official release (`type-plus@latest`) and adopt v8 when it
reaches a stable release.

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
