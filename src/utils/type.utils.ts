/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNotUndefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined'
}
