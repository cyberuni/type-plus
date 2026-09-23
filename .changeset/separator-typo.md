---
'type-plus': patch
---

Rename the `Seperator` type parameter of `StringSplit` and `StringPlus.Split` to `Separator`. Type parameter names are not part of the call signature, so existing code keeps working.
