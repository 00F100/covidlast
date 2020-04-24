import { ICollection, IModel } from '.';

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
}