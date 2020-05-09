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
   * @param _factoryModelParseResultIntegration () => IModelParseResultIntegration
   */
  public constructor(
    private _collectionCountries: ICollectionCountries,
    private _collectionWorldoMeters: ICollectionWorldOMeters,
    private _collectionDatas: ICollectionsDatas,
    private _helperWorldOMetersCasesFilter: IHelperWorldOMetersCasesFilter,
    private _helperWorldOMetersDeathsFilter: IHelperWorldOMetersDeathsFilter,
    private _helperWorldOMetersActiveFilter: IHelperWorldOMetersActiveFilter,
    private _helperWorldOMetersDateFixFilter: IHelperWorldOMetersDateFixFilter,
    private _factoryModelParseResultIntegration: () => IModelParseResultIntegration
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

    const {
      HELPER_FILTER_CASES,
      HELPER_FILTER_DEATHS,
      HELPER_FILTER_ACTIVE
    } = process.env;

    const modelCountry = this._collectionCountries
      .getById(input.country.id)
      .getData<IModelCountry>()
      .find(Boolean);

    Logger.get().info(`Country "${modelCountry.name}" selected to use in handler extract`);

    const collectionWorldOMeters = this._collectionWorldoMeters
      .getByCountryAlias(modelCountry.alias)
      .getData<IModelHtmlResponse>()
      .find(Boolean);

    const modelWorldOMeters = this._factoryModelParseResultIntegration();

    Logger.get().info(`Helper filter cases is "${HELPER_FILTER_CASES}"`);
    if (HELPER_FILTER_CASES === 'true') {
      this._helperWorldOMetersCasesFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    }

    Logger.get().info(`Helper filter deaths is "${HELPER_FILTER_DEATHS}"`);
    if (HELPER_FILTER_DEATHS === 'true') {
      this._helperWorldOMetersDeathsFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    }

    Logger.get().info(`Helper filter active is "${HELPER_FILTER_ACTIVE}"`);
    if (HELPER_FILTER_ACTIVE === 'true') {
      this._helperWorldOMetersActiveFilter.apply(modelWorldOMeters, collectionWorldOMeters.html);
    }

    this._helperWorldOMetersDateFixFilter.apply(modelWorldOMeters);

    this._collectionDatas.createCaseFromIntegration(modelCountry, modelWorldOMeters);

    Logger.get().info('Handler extract finish!');
    response.send('Handler Extract Finish');
  }
}
