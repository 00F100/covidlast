import { IHelperWorldOMetersDeathsFilter, IModelParseResultIntegration } from '..';
import { HelperWorldOMeters } from '../helpers';

export class HelperWorldOMetersDeathsFilter extends HelperWorldOMeters implements IHelperWorldOMetersDeathsFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelParseResultIntegration
   * @param input string
   * @return void
   */
  public apply = (model: IModelParseResultIntegration, input: string): void => {
    const obj = this.getObject(input, 'coronavirus-deaths-linear');
    model.load({ deaths: obj.series.find(Boolean).data});
  }
}