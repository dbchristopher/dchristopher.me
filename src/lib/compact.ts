export const compact = <T>(arr: unknown[]): T[] => {
  return arr.filter(x => !!x) as T[]
}
