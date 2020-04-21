import { IModelCountry } from '../models';

export interface IHandlerInput {

  /**
   * Command to execute in handler
   * @param string
   */
  command: string;

  /**
   * Origin to scrap
   * @param string
   */
  origin?: string;

  /**
   * Arguments to apply in request
   */
  country?: IModelCountry;
}