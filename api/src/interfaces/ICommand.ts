import { IHandlerInput, IResponse } from '.';

export interface ICommand {

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  execute(input: IHandlerInput, response: IResponse): void;
}