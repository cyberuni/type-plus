/**
 * The `$fail` value of options `$O`, or `never` when `$O` leaves it out.
 */
export type _ResolveFail<$O> = '$fail' extends keyof $O ? $O['$fail' & keyof $O] : never
