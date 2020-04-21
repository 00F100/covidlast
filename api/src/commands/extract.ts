import { Command, IExtractCommand, IHandlerInput, IResponse } from '..';
import { ICollectionWorldOMeters } from '../collections/interfaces';

export class ExtractCommand extends Command implements IExtractCommand {

  public constructor(
    private _collectionWorldoMeters: ICollectionWorldOMeters
  ) {
    super();
  }

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  public execute = (input: IHandlerInput, response: IResponse): void => {
    const data = this._collectionWorldoMeters.getByCountryId(input.country.id).getData();
    response.send('extraction finish!');
  }
}