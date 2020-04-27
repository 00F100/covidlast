import { IHelper, IModelParseResultIntegration } from '../..';

export interface IHelperWorldOMetersDateFixFilter extends IHelper {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelParseResultIntegration
   * @param input string
   * @return void
   */
  apply(model: IModelParseResultIntegration): void;
}