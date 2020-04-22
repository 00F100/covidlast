import { ICommand, IHandlerInput, IResponse } from './interfaces';

export class Command implements ICommand {

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  public execute = (input: IHandlerInput, response: IResponse): void => {
    return null;
  }
}