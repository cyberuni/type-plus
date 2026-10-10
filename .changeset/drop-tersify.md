---
"type-plus": patch
---

Remove the unused `tersify` dependency.
Nothing in `type-plus` imports it since the deprecated exports were removed, and it pulled in `acorn`, about 1.3 MB per install.
