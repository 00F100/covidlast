import { IHelperWorldOMetersActiveFilter, IModelParseResultIntegration } from '..';
import { HelperWorldOMeters } from '../helpers';

export class HelperWorldOMetersActiveFilter extends HelperWorldOMeters implements IHelperWorldOMetersActiveFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelParseResultIntegration
   * @param input string
   * @return void
   */
  public apply = (model: IModelParseResultIntegration, input: string): void => {
    const obj = this.getObject(input, 'graph-active-cases-total');
    model.load({ deaths: obj.series.find(Boolean).data});
  }
}