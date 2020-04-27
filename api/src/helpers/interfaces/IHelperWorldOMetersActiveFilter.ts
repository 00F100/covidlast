import { IHelper, IModelParseResultIntegration } from '../..';

export interface IHelperWorldOMetersActiveFilter extends IHelper {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param input string
   * @param output IModelParseResultIntegration
   * @return void
   */
  apply(model: IModelParseResultIntegration, input: string): void;
}