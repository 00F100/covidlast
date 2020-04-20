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
   * @param _factoryModelCase () => IModelCase
   * @return void
   */
  public constructor(
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
    datas.map((data: IModelData) => {
      const model = this.getModelByCountryId(data);
      model.data.push([model.data.length, data.cases]);
    });
    this.sortDataByCountry();
    return this;
  }

  /**
   * Method to get model by country id
   *
   * @param data IModelData
   * @return IModelCase
   */
  private getModelByCountryId = (data: IModelData): IModelCase => {
    let model = this._data.find(x => x.countryId === data.countryId);
    if (!model) {
      model = this._factoryModelCase();
      model.load({ ... data, name: data.countryName, countryPopulation: data.population, countryColor: data.color });
      this._data.push(model);
    }
    return model;
  }

  /**
   * Method to sort data by country name
   *
   * @return void
   */
  private sortDataByCountry = (): void => {
    this._data.sort((a: IModelCase, b: IModelCase): number => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
  }
}