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
   * Name of chart label
   * @param string
   */
  public name: string = '';

  /**
   * Data of cases by time
   * @param number[]
   */
  public data: number[] = [];
}