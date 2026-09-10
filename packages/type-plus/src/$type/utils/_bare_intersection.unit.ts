import { it } from 'vitest'
import { testType } from '../../index.js'
import type { _BareIntersection } from './_bare_intersection.js'

it('leaves a bare type alone', () => {
	testType.equal<_BareIntersection<string, String>, string>(true)
	testType.equal<_BareIntersection<'', String>, ''>(true)
	testType.equal<_BareIntersection<'abc', String>, 'abc'>(true)
	testType.equal<_BareIntersection<`${number}`, String>, `${number}`>(true)
	testType.equal<_BareIntersection<Uppercase<`${number}`>, String>, Uppercase<`${number}`>>(true)
	testType.equal<_BareIntersection<-1, Number>, -1>(true)
})

it('peels a single intersected record', () => {
	testType.equal<_BareIntersection<'abc' & { a: 1 }, String>, 'abc'>(true)
	testType.equal<_BareIntersection<`${number}` & { a: 1 }, String>, `${number}`>(true)
	testType.equal<_BareIntersection<string & { a: 1 }, String>, string>(true)
	testType.equal<_BareIntersection<-1 & { a: 1 }, Number>, -1>(true)
})

it('peels a record holding multiple members', () => {
	testType.equal<_BareIntersection<'abc' & { a: 1; b: 2 }, String>, 'abc'>(true)
})

it('peels multiple intersected records', () => {
	testType.equal<_BareIntersection<'abc' & { a: 1 } & { b: 2 }, String>, 'abc'>(true)
})

it('does not peel an intersected index signature', () => {
	testType.equal<_BareIntersection<'abc' & Record<number, unknown>, String>, 'abc' & Record<number, unknown>>(true)
})

it('does not peel an intersection nested inside a string manipulation type', () => {
	testType.equal<_BareIntersection<Uppercase<'' & { a: 1 }>, String>, Uppercase<'' & { a: 1 }>>(true)
})
