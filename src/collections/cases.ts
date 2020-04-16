import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { IModelCase, IModelData } from '../models';
import { ICollectionsCases, ICollectionsDatas } from './interfaces';

export class CollectionCases extends Collection implements ICollectionsCases {

  /**
   * Data of collection
   * @param IModelCase[]
   */
  protected _data: IModelCase[] = [];

  /**
   * Method to construct instance of Collection Cases
   *
   * @param _databaseSQLite3 sqlite3.Database
   * @param _factoryModelCase () => IModelCase
   * @return void
   */
  public constructor(
    private _databaseSQLite3: sqlite3.Database,
    private _factoryModelCase: () => IModelCase
  ) {
    super();
  }

  /**
   * Method to get cases from data
   *
   * @param collectionDatas ICollectionsDatas
   * @return ICollectionsCases
   */
  public getByCountry = (collectionDatas: ICollectionsDatas): ICollectionsCases => {
    const datas = collectionDatas.getData<IModelData>();
    datas.map((data) => {
      let model = this._data.find(x => x.countryId === data.countryId);
      if (!model) {
        model = this._factoryModelCase();
        model.countryName = data.countryName;
        model.name = data.countryName;
        model.countryId = data.countryId;
        this._data.push(model);
      }
      model.data.push([`day ${model.data.length} | ${data.date}`, data.cases]);
    });
    return this;
  }
}