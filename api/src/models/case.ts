import { Model } from '../model';
import { IModelCase } from './interfaces';

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
   * @param [number, number][]
   */
  public data: [number, number][] = [];
}