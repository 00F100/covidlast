import { IHelperRegex } from '.';
import { IModelRegexResponse } from '..';
import { Helper } from '../helper';

export class HelperWorldOMetersFilter extends Helper implements IHelperRegex {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param input string
   * @param output () => T
   * @return T
   */
  public apply = (input: string, output: () => IModelRegexResponse): IModelRegexResponse => {

    const match = this.matchBlockChart(input);
    const clean = this.clean(match);
    const json = this.fixJson(clean);

    const obj = JSON.parse(json);

    const model = output();

    model.load({ days: obj.xAxis.categories, data: obj.series.find(Boolean).data});

    this.fixDate(model);

    return model;
  }

  /**
   * Method to fix date extracted
   *
   * @param model IModelRegexResponse
   * @return void
   */
  private fixDate = (model: IModelRegexResponse): void => {

  }

  /**
   * Method to match data on HTML result
   *
   * @param input string
   * @return string
   */
  private matchBlockChart = (input: string): string => {
    return input.match(/coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g).find(Boolean);
  }

  /**
   * Method to clean string extracted
   *
   * @param input string
   * @return string
   */
  private clean = (input: string): string => {
    return input.replace('coronavirus-cases-linear\', ', '').slice(0, -2);
  }

  /**
   * Method to fix JSON extracted
   *
   * @param input string
   * @return string
   */
  private fixJson = (input: string): string => {
    return input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
  }
}