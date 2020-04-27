import { IModelParseResultIntegration } from '..';
import { Model } from '../model';

export class ModelParseResultIntegration extends Model implements IModelParseResultIntegration {

  /**
   * Days to compare cases evolution
   * @param string[]
   */
  public days: string[] = [];

  /**
   * Data of cases
   * @param number[]
   */
  public cases: number[] = [];

  /**
   * Data of deaths
   * @param number[]
   */
  public deaths: number[] = [];

  /**
   * Data of active cases
   * @param number[]
   */
  public active: number[] = [];
}