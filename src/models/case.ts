import { Model } from '../model';
import { IModelCase } from './interfaces';

export class ModelCase extends Model implements IModelCase {

  /**
   * Name of country
   * @param string
   */
  public name: string = '';

  /**
   * Data of cases by time
   * @param number[]
   */
  public data: number[] = [];
}