import { IHelperWorldOMetersCasesFilter, IModelParseResultIntegration } from '..';
import { HelperWorldOMeters } from '../helpers';

export class HelperWorldOMetersCasesFilter extends HelperWorldOMeters implements IHelperWorldOMetersCasesFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelParseResultIntegration
   * @param input string
   * @return void
   */
  public apply = (model: IModelParseResultIntegration, input: string): void => {
    const obj = this.getObject(input, 'coronavirus-cases-linear');
    model.load({ days: obj.xAxis.categories, cases: obj.series.find(Boolean).data});
  }
}