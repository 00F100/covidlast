import { Command, IExtractCommand, IHandlerInput, IResponse } from '..';

export class ExtractCommand extends Command implements IExtractCommand {

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  public execute = (input: IHandlerInput, response: IResponse): void => {
    response.send('extraction finish!');
  }
}