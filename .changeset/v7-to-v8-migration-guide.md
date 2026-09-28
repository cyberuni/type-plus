---
'type-plus': patch
---

Link the readme to the new [v7 to v8 migration guide](https://cyberuni.github.io/type-plus/guides/migrating-to-v8/), which lists every breaking change with a before and after example.

Correct the `ObjectPlus.Merge` signature in `src/object/readme.md`: it takes `A` and `B` only, since its unused options parameter was removed in 8.0.
