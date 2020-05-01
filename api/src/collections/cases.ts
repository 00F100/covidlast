import { ICollectionsCases, ICollectionsDatas, IModelCase, IModelData } from '..';
import { Collection } from '../collection';

export class CollectionCases extends Collection implements ICollectionsCases {

  /**
   * Data of collection
   * @param IModelCase[]
   */
  protected _data: IModelCase[] = [];

  /**
   * Number of pages
   * @param number
   */
  protected _pages: number = 1;

  /**
   * Total of records
   * @param number
   */
  protected _total: number = 0;

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
    datas.map((data: IModelData, index: number) => {
      const model = this.getModelByCountryId(data);
      model.data.push({
        timestamp: data.timestamp,
        cases: data.cases,
        deaths: data.deaths,
        active: data.active
      });
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
      model.load({ ...data, name: data.countryName, countryPopulation: data.population, countryColor: data.color });
      this._data.push(model);
    }
    this._total = this._data.length;
    return model;
  }

  /**
   * Method to sort data by country name
   *
   * @return void
   */
  private sortDataByCountry = (): void => {
    this._data.sort((a: IModelCase, b: IModelCase): number => {
      if (a.countryName < b.countryName) { return -1; }
      if (a.countryName > b.countryName) { return 1; }
      return 0;
    });
  }
}