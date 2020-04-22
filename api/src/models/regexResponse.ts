import { Model } from '../model';
import { IModelRegexResponse } from './interfaces';

export class ModelRegexResponse extends Model implements IModelRegexResponse {
  
  /**
   * Days to compare cases evolution
   * @param string[]
   */
  public days: string[] = [];

  /**
   * Data of cases
   * @param number[]
   */
  public data: number[] = [];
}