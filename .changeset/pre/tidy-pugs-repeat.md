---
'type-plus': patch
---

Stop emitting `esm/package.json`, and declare `"sideEffects": false` in the
`cjs/package.json` marker.

The package root already declares `"type": "module"`, so `esm/*.js` are ESM by
inheritance — the marker restated what was already true. It was also costing
consumers tree-shaking. Bundlers read `sideEffects` from the nearest
`package.json` describing a module, and `esm/package.json` became that file for
every ESM entry point while carrying no `sideEffects` field, so webpack fell
back to assuming side effects. Bundling an ESM consumer that imports a single
symbol produced 32,779 bytes across 21 modules with the file present and 707
bytes across 2 modules without it. Rollup with `@rollup/plugin-node-resolve`
produced byte-identical output either way — its own static analysis drops the
unused modules regardless — so this was a webpack-class regression, not a
universal one.

The `cjs/package.json` marker stays: without it Node reads `cjs/index.js` as
ESM and its `require()` calls resolve against the caller. It now also carries
`"sideEffects": false`, since it shadows the root field for CJS consumers the
same way.
