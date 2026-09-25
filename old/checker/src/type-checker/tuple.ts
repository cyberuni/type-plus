export namespace Tuple {
	export type Head<T extends any[]> = T['length'] extends 0 ? never : T[0]
	export type Tail<T extends any[]> = T['length'] extends 0
		? never
		: T extends [any, ...infer Tail]
		? Tail
		: T

	export type FindByProp<
		Tuple extends Array<{ [K in Key]: any }>,
		Key extends string,
		Value
	> = FindByProp._FindByProp<Tuple, Key, Value>['result']

	export namespace FindByProp {
		export type _FindByProp<
			Tuple extends Array<{ [K in Key]: any }>,
			Key extends string,
			Value
		> = Tuple['length'] extends 0
			? { result: never }
			: { result: Value extends Tuple[0][Key] ? Tuple[0] : _FindByProp<Tail<Tuple>, Key, Value>['result'] }
	}
}
