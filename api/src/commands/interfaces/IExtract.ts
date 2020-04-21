import { ICommand, IHandlerInput, IResponse } from '../../interfaces';

export interface IExtractCommand extends ICommand {

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  execute(input: IHandlerInput, response: IResponse): void;
}