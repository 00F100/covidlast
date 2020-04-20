import { IModel } from '../../interfaces';

export interface IModelCase extends IModel {

  /**
   * ID of country
   * @param number
   */
  countryId: number;

  /**
   * Name of country
   * @param string
   */
  countryName: string;

  /**
   * Number of population country
   * @param number
   */
  countryPopulation: number;

  /**
   * Color of country in chart
   * @param string
   */
  countryColor: string;

  /**
   * Name of chart label
   * @param string
   */
  name: string;

  /**
   * Data of cases by time
   * @param number[]
   */
  data: any[];
}