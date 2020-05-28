import { IModelCase } from '..';
import { Model } from '../model';

export class ModelCase extends Model implements IModelCase {

  /**
   * ID of country
   * @param number
   */
  public countryId: number = 0;

  /**
   * Name of country
   * @param string
   */
  public countryName: string = '';

  /**
   * Number of population country
   * @param number
   */
  public countryPopulation: number = 0;

  /**
   * Color of country in chart
   * @param string
   */
  public countryColor: string = '';

  /**
   * Data of cases by time
   * @param number[]
   */
  public data: [number, number, number, number][] = [];
}