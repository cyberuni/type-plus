/**
 * Types that can contain custom properties.
 */
export type ComposableTypes = object | Function

/**
 * Types that cannot contain custom properties.
 */
export type NonComposableTypes = boolean | number | string | symbol | bigint | undefined | null
