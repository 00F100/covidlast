import { IModelRegexResponse } from '../..';

export interface IHelperWorldOMetersFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param input string
   * @param output IModelRegexResponse
   * @return void
   */
  apply(model: IModelRegexResponse, input: string): void;
}