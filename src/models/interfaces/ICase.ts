import { IModel } from '../../interfaces';

export interface IModelCase extends IModel {

  /**
   * Name of country
   * @param string
   */
  name: string;

  /**
   * Data of cases by time
   * @param number[]
   */
  data: number[];
}