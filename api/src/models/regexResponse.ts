import { IModelRegexResponse } from '..';
import { Model } from '../model';

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