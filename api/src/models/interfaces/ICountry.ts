import { IModel } from '../../interfaces';

export interface IModelCountry extends IModel {

  /**
   * ID of country
   * @param number
   */
  id: number;

  /**
   * Name of country
   * @param string
   */
  name?: string;
}