// import type { Add, IsStrictNumber } from '../index.js'

// export type Sum<A extends number[], Fail = never> = IsStrictNumber<
// 	A['length'],
// 	Fail,
// 	A['length'] extends 0
// 		? 0
// 		: A['length'] extends 1
// 		? A[0]
// 		: A['length'] extends 2
// 		? Add<A[0], A[1]>
// 		: A extends [infer F extends number, infer S extends number, ...infer Tail extends number[]]
// 		? Sum<[Add<F, S>, ...Tail]>
// 		: never
// >
