/**
 * Merging value types from multiple promises.
 */
export type PromiseValueMerge<
	P1 extends Promise<any>,
	P2 extends Promise<any>,
	P3 extends Promise<any> = any,
	P4 extends Promise<any> = any,
	P5 extends Promise<any> = any,
	P6 extends Promise<any> = any,
	P7 extends Promise<any> = any,
	P8 extends Promise<any> = any,
	P9 extends Promise<any> = any,
> = Promise<
	Awaited<P1> &
		Awaited<P2> &
		Awaited<P3> &
		Awaited<P4> &
		Awaited<P5> &
		Awaited<P6> &
		Awaited<P7> &
		Awaited<P8> &
		Awaited<P9>
>
