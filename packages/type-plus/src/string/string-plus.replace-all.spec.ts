import { it } from 'vitest'

import { type StringPlus, testType } from '../index.js'

it('replaces every occurrence of Search', () => {
	testType.equal<StringPlus.ReplaceAll<'a.b.c', '.', '/'>, 'a/b/c'>(true)
	testType.equal<StringPlus.ReplaceAll<'abcabc', 'bc', 'x'>, 'axax'>(true)
	testType.equal<StringPlus.ReplaceAll<'...', '.', ''>, ''>(true)
})

it('matches left to right without overlapping', () => {
	testType.equal<StringPlus.ReplaceAll<'aaa', 'aa', 'b'>, 'ba'>(true)
})

it('does not rescan the Replacement', () => {
	testType.equal<StringPlus.ReplaceAll<'ab', 'a', 'aa'>, 'aab'>(true)
})

it('returns Subject unchanged when it does not contain Search', () => {
	testType.equal<StringPlus.ReplaceAll<'abc', 'd', 'x'>, 'abc'>(true)
	testType.equal<StringPlus.ReplaceAll<'', 'a', 'x'>, ''>(true)
})

it('inserts Replacement around every character for an empty Search', () => {
	testType.equal<StringPlus.ReplaceAll<'abc', '', '-'>, '-a-b-c-'>(true)
	testType.equal<StringPlus.ReplaceAll<'', '', '-'>, '-'>(true)
})

it('gives string for a wide Subject or Search', () => {
	testType.equal<StringPlus.ReplaceAll<string, 'a', 'x'>, string>(true)
	testType.equal<StringPlus.ReplaceAll<'abc', string, 'x'>, string>(true)
})

it('distributes over a union Subject', () => {
	testType.equal<StringPlus.ReplaceAll<'a.b.c' | 'd.e', '.', '/'>, 'a/b/c' | 'd/e'>(true)
})

it('handles long strings', () => {
	type S = 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z'
	testType.equal<StringPlus.ReplaceAll<S, '.', ''>, 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'>(true)
})
