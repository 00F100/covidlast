import { Command, ICollectionCountries, ICollectionsDatas, ICollectionWorldOMeters, IExtractCommand, IHandlerInput, IHelperWorldOMetersCasesFilter, IHelperWorldOMetersDateFixFilter, IHelperWorldOMetersDeathsFilter, IModelCountry, IModelHtmlResponse, IModelParseResultIntegration, IResponse, Logger } from '..';
import { IHelperWorldOMetersActiveFilter } from '../helpers';

export class ExtractCommand extends Command implements IExtractCommand {

  /**
   * Method to create instance of Extract command
   *
   * @param _collectionCountries ICollectionCountries
   * @param _collectionWorldoMeters ICollectionWorldOMeters
   * @param _collectionDatas ICollectionsDatas
   * @param _helperWorldOMetersCasesFilter IHelperWorldOMetersCasesFilter
   * @param _factoryModelRegexResponse () => IModelParseResultIntegration
   */
  public constructor(
    private _collectionCountries: ICollectionCountries,
    private _collectionWorldoMeters: ICollectionWorldOMeters,
    private _collectionDatas: ICollectionsDatas,
    private _helperWorldOMetersCasesFilter: IHelperWorldOMetersCasesFilter,
    private _helperWorldOMetersDeathsFilter: IHelperWorldOMetersDeathsFilter,
    private _helperWorldOMetersActiveFilter: IHelperWorldOMetersActiveFilter,
    private _helperWorldOMetersDateFixFilter: IHelperWorldOMetersDateFixFilter,
    private _factoryModelRegexResponse: () => IModelParseResultIntegration
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

    Logger.get().info(`Country "${modelCountry.name}" selected to use in handler extract`);

    const collectionWorldOMeters = this._collectionWorldoMeters
      .getByCountryAlias(modelCountry.alias)
      .getData<IModelHtmlResponse>()
      .find(Boolean);

    const modelWorldOMeters = this._factoryModelRegexResponse();
    
    // apply filters/parsers
    this._helperWorldOMetersCasesFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    this._helperWorldOMetersDeathsFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    this._helperWorldOMetersActiveFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    this._helperWorldOMetersDateFixFilter.apply(modelWorldOMeters);

    this._collectionDatas.createCaseFromIntegration(modelCountry, modelWorldOMeters);

    Logger.get().info('Handler extract finish!');
    response.send('Handler Extract Finish');
  }
}
