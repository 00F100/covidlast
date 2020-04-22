import { IModelRegexResponse } from '../..';

export interface IHelperRegex {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param input string
   * @param output () => T
   * @return T
   */
  apply(input: string, output: () => IModelRegexResponse): IModelRegexResponse;
}