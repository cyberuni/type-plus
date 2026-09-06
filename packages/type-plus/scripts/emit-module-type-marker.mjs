// Usage: node scripts/emit-module-type-marker.mjs
//
// The package root declares `"type": "module"`, so every `.js` file under it is
// ESM by default -- including the CommonJS output in `cjs/`. Node then loads
// `cjs/index.js` as ESM, and its `require()` calls resolve against the caller
// instead of against the package, failing with MODULE_NOT_FOUND.
//
// A `package.json` in `cjs/` tells Node that directory is CommonJS. `tsc` does
// not emit one, and `clean` wipes the directory, so it is written after each
// compile rather than checked in.
//
// It also has to restate `"sideEffects": false`: bundlers read that field from
// the nearest `package.json` describing a module, so this file shadows the root
// one for everything under `cjs/`. `esm/` gets no such file -- the root already
// says `"type": "module"`, and adding one there would shadow `sideEffects` for
// the build consumers actually tree-shake.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'cjs', 'package.json')
writeFileSync(target, `${JSON.stringify({ type: 'commonjs', sideEffects: false }, null, 2)}\n`)
