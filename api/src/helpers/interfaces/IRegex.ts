export interface IHelperRegex {
  process<T>(input: string, output: () => T): T;
}