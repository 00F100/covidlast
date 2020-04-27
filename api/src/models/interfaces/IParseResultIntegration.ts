import { IModel } from '../..';

export interface IModelParseResultIntegration extends IModel {

  /**
   * Days to compare cases evolution
   * @param string[]
   */
  days: string[];

  /**
   * Data of cases
   * @param number[]
   */
  cases: number[];

  /**
   * Data of deaths
   * @param number[]
   */
  deaths: number[];

  /**
   * Data of active cases
   * @param number[]
   */
  active: number[];
}