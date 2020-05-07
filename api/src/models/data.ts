import { ID, Type } from 'validate-typescript';
import { IModelData, IModelDataSignature } from '..';
import { Model } from '../model';

export class ModelData extends Model implements IModelData {

  /**
   * ID of data
   * @param number
   */
  public id?: number = 0;

  /**
   * Number of cases
   * @param number
   */
  public cases: number = 0;

  /**
   * Number of deaths
   * @param number
   */
  public deaths: number = 0;

  /**
   * Number of active cases
   * @param number
   */
  public active: number = 0;

  /**
   * Timestamp captured data
   * @param number
   */
  public timestamp: number = 0;

  /**
   * Date captured data
   * @param string
   */
  public date?: string = '';

  /**
   * Name of country
   * @param string
   */
  public countryName?: string = '';

  /**
   * ID of country
   * @param number
   */
  public countryId: number = 0;

  /**
   * Population of country
   * @param number
   */
  public population?: number = 0;

  /**
   * Color of country in chart
   * @param string
   */
  public color?: string = '';

  /**
   * Fields required to save
   * @param IModelDataSignature<Number>
   */
  public required: IModelDataSignature<number> = {
    cases: Type<number, number>(Number),
    deaths: Type<number, number>(Number),
    active: Type<number, number>(Number),
    countryId: Type<number, number>(Number),
    timestamp: Type<number, number>(Number)
  }

  /**
   * Fields conditional to save
   * @param {IModelDataSignature<Number>}
   */
  public conditionals: IModelDataSignature<number> = {
    cases: ID(),
  };
}
