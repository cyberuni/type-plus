import { it } from 'vitest'

import { type ObjectPlus, type Omit, type Partial, type Pick, type Required, testType } from '../index.js'

type U = { k: 'x'; x: 1 } | { k: 'y'; y: 2; z?: 3 | undefined }

it('keeps the deprecated top-level Partial as an alias of ObjectPlus.Partial', () => {
	testType.equal<Partial<U>, ObjectPlus.Partial<U>>(true)
})

it('keeps the deprecated top-level Required as an alias of ObjectPlus.Required', () => {
	testType.equal<Required<U>, ObjectPlus.Required<U>>(true)
})

it('keeps the deprecated top-level Pick as an alias of ObjectPlus.Pick', () => {
	testType.equal<Pick<U, 'k' | 'y'>, ObjectPlus.Pick<U, 'k' | 'y'>>(true)
})

it('keeps the deprecated top-level Omit as an alias of ObjectPlus.Omit', () => {
	testType.equal<Omit<U, 'k' | 'y'>, ObjectPlus.Omit<U, 'k' | 'y'>>(true)
})
