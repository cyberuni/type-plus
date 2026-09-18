export interface Fn {
    input: [unknown, unknown];
    output: [unknown, unknown];
}
/**
 * Evaluate a series of functions on an input value.
 */
export type Eval<Input, Fns extends Fn[]> = Pipe<[Input, unknown], Fns>[0];
/**
 * Pipe input and error to a series of functions.
 *
 * @template Input - The initial input value for the pipeline.
 * @template Fns - The list of `Fn` functions to apply to the input.
 * @returns The final output value after applying all the functions in the pipeline.
 */
export type Pipe<Input extends [value: unknown, error: unknown], Fns extends Fn[]> = Fns extends [
    infer H extends Fn,
    ...infer Rest extends Fn[]
] ? Pipe<(H & {
    input: Input;
})['output'], Rest> : Input;
//# sourceMappingURL=fn.d.ts.map