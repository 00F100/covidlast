import { ICollection, IModel } from './interfaces';

export class Collection implements ICollection {

  /**
   * Data of collection
   * @param any[]
   */
  protected _data: any[];

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
}