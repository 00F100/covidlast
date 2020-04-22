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

  /**
   * Alias of country
   * @param string
   */
  alias?: string;

  /**
   * Population of country
   * @param number
   */
  population?: number;

  /**
   * Color of country in chart
   * @param string
   */
  color?: string;
}