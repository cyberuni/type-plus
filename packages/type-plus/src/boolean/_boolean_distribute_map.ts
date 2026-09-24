/**
 * Encodes which of `true`, `false`, and `boolean` the members of `T` cover,
 * one letter per check, so `IsBoolean` and `IsNotBoolean` can read a union's shape in one step.
 */
export type _BooleanDistributeMap<T> = T extends true
	? T extends false
		? true extends T
			? false extends T
				? 'ABCD'
				: 'ABCd'
			: false extends T
				? 'ABcD'
				: 'ABcd'
		: true extends T
			? false extends T
				? 'AbCD'
				: 'AbCd'
			: false extends T
				? 'AbcD'
				: 'Abcd'
	: T extends false
		? true extends T
			? false extends T
				? 'aBCD'
				: 'aBCd'
			: false extends T
				? 'aBcD'
				: 'aBcd'
		: true extends T
			? false extends T
				? 'abCD'
				: 'abCd'
			: false extends T
				? 'abcD'
				: 'abcd'
