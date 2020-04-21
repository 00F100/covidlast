import { ICommand, IHandlerInput, IResponse } from './interfaces';

export class Command implements ICommand {
  public execute = (input: IHandlerInput, response: IResponse): void => {

  }
}