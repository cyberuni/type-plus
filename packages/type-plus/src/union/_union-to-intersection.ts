/**
 * Converts a union into the intersection of its members.
 *
 * Distributes `U` into contravariant parameter positions, so inferring the parameter yields the
 * intersection of every member.
 *
 * @see https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
 */
export type _UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
