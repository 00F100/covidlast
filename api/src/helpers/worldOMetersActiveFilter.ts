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
    const cases = [];
    let count = 0;
    model.cases.map(c => {
      if (c > 0) {
        count++;
      }
    });
    for (let i = 0; i < (model.cases.length - count); i++) {
      cases.push(0);
    }
    const obj = this.getObject(input, 'graph-active-cases-total');
    model.load({ active: cases.concat(obj.series.find(Boolean).data)});
  }
}