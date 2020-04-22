import { Command, IExtractCommand, IHandlerInput, IResponse } from '..';
import { ICollectionWorldOMeters, ICollectionCountries } from '../collections/interfaces';

export class ExtractCommand extends Command implements IExtractCommand {

  public constructor(
    private _collectionCountries: ICollectionCountries,
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
    const country = this._collectionCountries.getById(input.country.id);
    const casesObject = this._collectionWorldoMeters.getByCountryAlias(country.alias).getData();
    response.send('extraction finish!');
  }
}