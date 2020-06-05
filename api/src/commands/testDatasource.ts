import { ICollectionsDatas, ICommand, IHandlerInput, IResponse } from '..';
import { IModelData } from '../models';
import { Logger } from '../logger';

export class TestDatasourceCommand implements ICommand {

  public constructor(
    private _collectionDatasOriginal: ICollectionsDatas,
    private _collectionDatasNew: ICollectionsDatas
  ) {
  }

  /**
   * Method to execute command
   *
   * @param input IHandlerInput
   * @param response IResponse
   * @return void
   */
  public execute = (input: IHandlerInput, response: IResponse): void => {
    Logger.get().info('Init execute test datasource');
    const hasError = [];
    const dataOriginal = this._collectionDatasOriginal.getDataToCompare().getData<IModelData>();
    const dataNew = this._collectionDatasNew.getDataToCompare().getData<IModelData>();
    if (dataOriginal.length > 0 && dataNew.length > 0) {
      dataNew.map((data, index) => {
        const item = dataOriginal.find(x => x.countryName === data.countryName);
        if (item) {
          if (item.cases < data.cases) {
            hasError.push(`Found a minor value in new [country: ${data.countryName}, original: ${data.cases}, new: ${item.cases}]`);
          }
        } else {
          hasError.push(`Found in original but not in new [country: ${data.countryName}]`);
        }
      });
    }
    if (hasError.length > 0) {
      Logger.get().error('Has error on execute test datasource', hasError);
      response.send(JSON.stringify(hasError));
      throw new Error('Has error on execute test datasource');
    } else {
      response.send('0');
    }
    Logger.get().info('End execute test datasource');
  }

}