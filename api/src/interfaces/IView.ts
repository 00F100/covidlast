import { ICollection } from './ICollection';

export interface IView {

  /**
   * Method to get JSON from collection
   *
   * @param collection ICollection
   * @return object
   */
  json(collection: ICollection): object;

  /**
   * Method to get HTML
   *
   * @param layout string
   * @param params object
   * @return string
   */
  html(layout: string, params?: object): string;
}