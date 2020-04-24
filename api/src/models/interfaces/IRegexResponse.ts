import { IModel } from '../..';

export interface IModelRegexResponse extends IModel {
  
  /**
   * Days to compare cases evolution
   * @param string[]
   */
  days: string[];

  /**
   * Data of cases
   * @param number[]
   */
  data: number[];
}