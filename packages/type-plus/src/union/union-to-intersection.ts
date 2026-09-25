// from jcalz, https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
// istanbul ignore file
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export function toIntersection<U>(union: U): UnionToIntersection<U> {
	return union as any as UnionToIntersection<U>
}
