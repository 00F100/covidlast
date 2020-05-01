import { ICollection, IModel } from '.';

export class Collection implements ICollection {

  /**
   * Data of collection
   * @param any[]
   */
  protected _data: any[];

  /**
   * Current page
   * @param number
   */
  protected _page: number;

  /**
   * Number of pages
   * @param number
   */
  protected _pages: number;

  /**
   * Total of records
   * @param number
   */
  protected _total: number;

  /**
   * Method to get data of collection
   *
   * @return T[] | any[]
   */
  public getData = <T> (): T[] | any[] => {
    return this._data;
  }

  /**
   * Method to get JSON of data collection
   *
   * @return string
   */
  public toJSON = (): string => {
    return JSON.stringify(this._data);
  }

  /**
   * Method to populate model
   *
   * @param factory () => IModel
   * @param row any
   * @param data IModel[]
   * @return void
   */
  public populateModel = (factory: () => IModel, row: any, data: IModel[]) : void => {
    const model = factory();
    model.load(row);
    data.push(model);
  }

  /**
   * Method to get current page
   *
   * @return number
   */
  public currentPage = (): number => {
    return this._page || 1;
  }

  /**
   * Method to get pages
   *
   * @return number
   */
  public getPages = (): number => {
    return this._pages;
  }

  /**
   * Method to get total of records
   *
   * @return number
   */
  public getTotal = (): number => {
    return this._total;
  }
}