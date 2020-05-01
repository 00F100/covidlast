import { IModel } from '.';

export interface ICollection {

  /**
   * Method to convert data to JSON
   * @return string
   */
  toJSON(): string;

  /**
   * Method to return data
   * @param T[]
   */
  getData<T>(): T[];

  /**
   * Method to populate model
   *
   * @param factory () => IModel
   * @param row any
   * @param data IModel[]
   * @return void
   */
  populateModel(factory: () => IModel, row: any, data: IModel[]) : void;

  /**
   * Method to get current page
   *
   * @return number
   */
  currentPage(): number;

  /**
   * Method to get pages
   *
   * @return number
   */
  getPages(): number;

  /**
   * Method to get total of records
   *
   * @return number
   */
  getTotal(): number;
}