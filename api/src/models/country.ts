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
  public name: string = '';
}