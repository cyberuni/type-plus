import { it } from 'vitest'

import { type Multiply, testType } from '../index.js'

it('0 * 0 = 0', () => {
	testType.equal<Multiply<0, 0>, 0>(true)
})

it('123 * 0 = 0', () => {
	// => [[1,2,3], 0]
	// *  [[0], 0]
	// => [[0], 0]
	testType.equal<Multiply<123, 0>, 0>(true)
	testType.equal<Multiply<-123, 0>, 0>(true)
	testType.equal<Multiply<123, -0>, 0>(true)
	testType.equal<Multiply<-123, -0>, 0>(true)

	testType.equal<Multiply<0, 123>, 0>(true)
	testType.equal<Multiply<-0, 123>, 0>(true)
	testType.equal<Multiply<0, -123>, 0>(true)
	testType.equal<Multiply<-0, -123>, 0>(true)
})

it('123 * 1 = 123', () => {
	// => [[1,2,3], 0]
	// *  [[1], 0]
	// => [[1,2,3], 0]
	testType.equal<Multiply<123, 1>, 123>(true)
	testType.equal<Multiply<-123, 1>, -123>(true)
	testType.equal<Multiply<123, -1>, -123>(true)
	testType.equal<Multiply<-123, -1>, 123>(true)

	// => [      [1], 0]
	// *  [[1, 2, 3], 0]
	// => [[1, 0, 0], 0]
	// +  [   [2, 0], 0]
	// +  [      [3], 0]
	// => [[1, 2, 3], 0]
	testType.equal<Multiply<1, 123>, 123>(true)
	testType.equal<Multiply<-1, 123>, -123>(true)
	testType.equal<Multiply<1, -123>, -123>(true)
	testType.equal<Multiply<-1, -123>, 123>(true)
})

it('123 * 123 = 15129', () => {
	// => [[ 1, 2, 3], 0]
	// *  [[ 1, 2, 3], 0]
	// => [[ 1, 2, 3, 0, 0], 0]
	// +  [   [ 2, 4, 6, 0], 0]
	// +  [      [ 3, 6, 9], 0]
	// => [[ 1, 4, 7, 6, 0], 0]
	// +  [      [ 3, 6, 9], 0]
	// => [[ 1, 4,10,12, 9], 0]
	// => [[ 1, 5, 1, 2, 9], 0]
	testType.equal<Multiply<123, 123>, 15129>(true)
	testType.equal<Multiply<-123, 123>, -15129>(true)
	testType.equal<Multiply<123, -123>, -15129>(true)
	testType.equal<Multiply<-123, -123>, 15129>(true)
})

it('1357 * 9753 = 13234821', () => {
	// => [[1, 3, 5, 7], 0]
	// *  [[9, 7, 5, 3], 0]
	// => [    [  9, 27, 45, 63,  0,  0,  0], 0] // PadRight<MultiplyDigits<A, BHead>, Tail['length'], 0>
	// +  [        [  7, 21, 35, 49,  0,  0], 0] // PadRight<MultiplyDigits<A, BHead>, Tail['length'], 0>
	// +  [            [  5, 15, 25, 35,  0], 0] // PadRight<MultiplyDigits<A, BHead>, Tail['length'], 0>
	// +  [                [  3,  9, 15, 21], 0] // PadRight<MultiplyDigits<A, BHead>, Tail['length'], 0>
	// => [[  1,  2,  2,  1,  3,  0,  0,  0], 0] // normalize
	// +  [        [  9,  4,  9,  9,  0,  0], 0]
	// +  [            [  6,  7,  8,  5,  0], 0]
	// +  [                [  4,  0,  7,  1], 0]
	// => [[  1,  3,  1,  6,  2,  9,  0,  0], 0] // add + R2 and normalize
	// +  [            [  6,  7,  8,  5,  0], 0]
	// +  [                [  4,  0,  7,  1], 0]
	// => [[  1,  3,  2,  3,  0,  7,  5,  0], 0] // add + R3 and normalize
	// +  [                [  4,  0,  7,  1], 0]
	// => [[  1,  3,  2,  3,  4,  8,  2,  1], 0] // add + R4 and normalize
	testType.equal<Multiply<1357, 9753>, 13234821>(true)
	testType.equal<Multiply<-1357, 9753>, -13234821>(true)
	testType.equal<Multiply<1357, -9753>, -13234821>(true)
	testType.equal<Multiply<-1357, -9753>, 13234821>(true)
})

it('999 * 999 = 998001', () => {
	// => [[ 9, 9, 9], 0]
	// *  [[ 9, 9, 9], 0]
	// => [    [ 81, 81, 81,  0,  0], 0]
	// +  [        [ 81, 81, 81,  0], 0]
	// +  [            [ 81, 81, 81], 0]
	// => [[  8,  9,  9,  1,  0,  0], 0] // normalize
	// +  [    [  8,  9,  9,  1,  0], 0]
	// +  [        [  8,  9,  9,  1], 0]
	// => [[  9,  8,  9,  0,  1,  0], 0] // add + R2 and normalize
	// +  [        [  8,  9,  9,  1], 0]
	// => [[  9,  9,  8,  0,  0,  1], 0] // add + R2 and normalize
	testType.equal<Multiply<999, 999>, 998001>(true)
	testType.equal<Multiply<-999, 999>, -998001>(true)
	testType.equal<Multiply<999, -999>, -998001>(true)
	testType.equal<Multiply<-999, -999>, 998001>(true)
})

it('12.34 * 12.345 = 152.33730', () => {
	// e^2 + e^3 = e^5
	// => [                [  1,  2,  3,  4], 2]
	// *  [            [  1,  2,  3,  4,  5], 3]
	// => [[  1,  2,  3,  4,  0,  0,  0,  0], 5]
	// +  [    [  2,  4,  6,  8,  0,  0,  0], 5]
	// +  [        [  3,  6,  9, 12,  0,  0], 5]
	// +  [            [  4,  8, 12, 16,  0], 5]
	// +  [                [  5, 10, 15, 20], 5]
	// => [[  1,  2,  3,  4,  0,  0,  0,  0], 5] // normalize
	// +  [    [  2,  4,  6,  8,  0,  0,  0], 5]
	// +  [        [  3,  7,  0,  2,  0,  0], 5]
	// +  [            [  4,  9,  3,  6,  0], 5]
	// +  [                [  6,  1,  7,  0], 5]
	// => [[  1,  4,  8,  0,  8,  0,  0,  0], 5] //add + R2 and normalize
	// +  [        [  3,  7,  0,  2,  0,  0], 5]
	// +  [            [  4,  9,  3,  6,  0], 5]
	// +  [                [  6,  1,  7,  0], 5]
	// => [[  1,  5,  1,  7,  8,  2,  0,  0], 5] //add + R3 and normalize
	// +  [            [  4,  9,  3,  6,  0], 5]
	// +  [                [  6,  1,  7,  0], 5]
	// => [[  1,  5,  2,  2,  7,  5,  6,  0], 5] //add + R4 and normalize
	// +  [                [  6,  1,  7,  0], 5]
	// => [[  1,  5,  2,  3,  3,  7,  3,  0], 5] //add + R5 and normalize
	testType.equal<Multiply<12.34, 12.345>, 152.3373>(true)
	testType.equal<Multiply<-12.34, 12.345>, -152.3373>(true)
	testType.equal<Multiply<12.34, -12.345>, -152.3373>(true)
	testType.equal<Multiply<-12.34, -12.345>, 152.3373>(true)
})

it('0.01 * 0.002 = 0.00002', () => {
	// e^2 + e^3 = e^5
	// => [               [1], 2]
	// *  [               [2], 3]
	// => [               [2], 5]
	// => [[0, 0, 0, 0, 0, 2], 5] // NumericStruct normalize
	testType.equal<Multiply<0.01, 0.002>, 0.00002>(true)
	testType.equal<Multiply<-0.01, 0.002>, -0.00002>(true)
	testType.equal<Multiply<0.01, -0.002>, -0.00002>(true)
	testType.equal<Multiply<-0.01, -0.002>, 0.00002>(true)
})

it('0.04 * 0.005 = 0.0002', () => {
	// e^2 + e^3 = e^5
	// => [  [ 4], 2]
	// *  [  [ 5], 3]
	// => [  [20], 5]
	// => [[2, 0], 5]
	// => [[0,0,0,0,2], 5] // NumericStruct normalize remove trailing zeros
	testType.equal<Multiply<0.04, 0.005>, 0.0002>(true)
	testType.equal<Multiply<-0.04, 0.005>, -0.0002>(true)
	testType.equal<Multiply<0.04, -0.005>, -0.0002>(true)
	testType.equal<Multiply<-0.04, -0.005>, 0.0002>(true)
})

it('0.1357 * 0.009753 = 0.0013234821', () => {
	// =>   [                            [  1,  3,  5,  7],  4]
	// *    [                            [  9,  7,  5,  3],  6]
	// =>   [                [  9, 27, 45, 63,  0,  0,  0], 10]
	// +    [                    [  7, 21, 35, 49,  0,  0], 10]
	// +    [                        [  5, 15, 25, 35,  0], 10]
	// +    [                            [  3,  9, 15, 21], 10]
	// =>   [            [  1,  2,  2,  1,  3,  0,  0,  0], 10]
	// +    [                    [  9,  4,  9,  9,  0,  0], 10]
	// +    [                        [  6,  7,  8,  5,  0], 10]
	// +    [                            [  4,  0,  7,  1], 10]
	// =>   [            [  1,  3,  1,  6,  2,  9,  0,  0], 10]
	// +    [                        [  6,  7,  8,  5,  0], 10]
	// +    [                            [  4,  0,  7,  1], 10]
	// =>   [            [  1,  3,  2,  3,  0,  7,  5,  0], 10]
	// +    [                            [  4,  0,  7,  1], 10]
	// =>   [            [  1,  3,  2,  3,  4,  8,  2,  1], 10]
	// =>   [[  0,  0,  0,  1,  3,  2,  3,  4,  8,  2,  1], 10]
	// =>   0.0013234821
	testType.equal<Multiply<0.1357, 0.009753>, 0.0013234821>(true)
	testType.equal<Multiply<-0.1357, 0.009753>, -0.0013234821>(true)
	testType.equal<Multiply<0.1357, -0.009753>, -0.0013234821>(true)
	testType.equal<Multiply<-0.1357, -0.009753>, 0.0013234821>(true)
})

it('multiplies bigints', () => {
	testType.equal<Multiply<3n, 4n>, 12n>(true)
})

it('has no overflow guard', () => {
	testType.equal<Multiply<9007199254740991, 2>, 18014398509481982>(true)
})

it('a whole number result from fractional inputs cannot be represented', () => {
	testType.equal<Multiply<0.5, 4>, "The value '2.0' cannot be represented as bigint or number">(true)
})

it('widen type gets Fail', () => {
	testType.never<Multiply<number, 2>>(true)
})
