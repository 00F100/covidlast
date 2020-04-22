import { Model } from "../model";
import { IModelCountry } from "./interfaces";

export class ModelCountry extends Model implements IModelCountry {

  /**
   * ID of country
   * @param number
   */
  public id: number = 0;

  /**
   * Name of country
   * @param string
   */
  public name?: string = '';

  /**
   * Alias of country
   * @param string
   */
  public alias?: string = '';

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
}