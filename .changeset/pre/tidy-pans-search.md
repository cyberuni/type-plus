---
'type-plus': patch
---

Retire the `*_docs.spec.ts` convention. A test belongs with the behavior it
checks, not with where the claim came from.

#662 introduced one file per family collecting every assertion that mirrored a
TSDoc `@example`, and #672 through #674 extended it. That split the suite along
the wrong axis: `IsNumber`'s union behavior was asserted in both
`is_number.spec.ts` and `number_docs.spec.ts`, and a reader of either had no
way to know the other existed.

All twenty of those files are dissolved into the per-symbol specs, each
assertion placed under the test that already covers that behavior. Most were
duplicates and are simply gone — 214 of them in `number` and `numeric` alone,
where the per-symbol specs already made every claim. What survived is what the
per-symbol specs were missing, and pulling it across exposed real gaps:
`Increment` and `Decrement` had no test anywhere, `Widen` had no spec file at
all, and `Abs` covered neither zero nor a floating-point input.

`llms.txt` no longer claims that a named list of families has every example
pinned. That sentence was derived from a glob for `*_docs.spec.ts`, which only
ever proved the file existed, and there is no honest way to compute it now.
`AGENTS.md` states the rule that replaces it.
