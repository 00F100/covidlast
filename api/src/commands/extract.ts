import { Command, IExtractCommand, IHandlerInput, IResponse } from '..';
import { ICollectionCountries, ICollectionWorldOMeters } from '../collections/interfaces';
import { IHelperRegex } from '../helpers';
import { IModelCountry, IModelHtmlResponse, IModelRegexResponse } from '../models';

export class ExtractCommand extends Command implements IExtractCommand {

  public constructor(
    private _collectionCountries: ICollectionCountries,
    private _collectionWorldoMeters: ICollectionWorldOMeters,
    private _helperRegex: IHelperRegex,
    private _factoryModelRegexResponse: () => IModelRegexResponse
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
    const country = this._collectionCountries
      .getById(input.country.id)
      .getData<IModelCountry>()
      .find(Boolean);

    const worldOMeters = this._collectionWorldoMeters
      .getByCountryAlias(country.alias)
      .getData<IModelHtmlResponse>()
      .find(Boolean);

    const model = this._helperRegex.apply(worldOMeters.html, this._factoryModelRegexResponse);

    response.send('extraction finish!');
  }
}
