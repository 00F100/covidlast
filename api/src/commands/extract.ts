import {
  Command,
  ICollectionCountries,
  ICollectionsDatas,
  ICollectionWorldOMeters,
  IExtractCommand,
  IHandlerInput,
  IHelperWorldOMetersFilter,
  IModelCountry,
  IModelHtmlResponse,
  IModelRegexResponse,
  IResponse,
  Logger
} from '..';

export class ExtractCommand extends Command implements IExtractCommand {

  /**
   * Method to create instance of Extract command
   *
   * @param _collectionCountries ICollectionCountries
   * @param _collectionWorldoMeters ICollectionWorldOMeters
   * @param _collectionDatas ICollectionsDatas
   * @param _helperWorldOMetersFilter IHelperWorldOMetersFilter
   * @param _factoryModelRegexResponse () => IModelRegexResponse
   */
  public constructor(
    private _collectionCountries: ICollectionCountries,
    private _collectionWorldoMeters: ICollectionWorldOMeters,
    private _collectionDatas: ICollectionsDatas,
    private _helperWorldOMetersFilter: IHelperWorldOMetersFilter,
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
    const modelCountry = this._collectionCountries
      .getById(input.country.id)
      .getData<IModelCountry>()
      .find(Boolean);

    const collectionWorldOMeters = this._collectionWorldoMeters
      .getByCountryAlias(modelCountry.alias)
      .getData<IModelHtmlResponse>()
      .find(Boolean);
    
    const modelWorldOMeters = this._factoryModelRegexResponse();
    this._helperWorldOMetersFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    this._collectionDatas.createCaseFromIntegration(modelCountry, modelWorldOMeters);
    
    Logger.get().info('Handler extract finish!');
  }
}
