import { IModelCountry } from '..';

export interface IHandlerInput {

  /**
   * Command to execute in handler
   * @param string
   */
  command: string;

  /**
   * Arguments to apply in request
   */
  country: IModelCountry;
}