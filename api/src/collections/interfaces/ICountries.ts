import { ICollection } from '../..';

export interface ICollectionCountries extends ICollection {

  /**
   * Method to get country by id
   *
   * @param id number
   * @return ICollectionCountries
   */
  getById(id: number): ICollectionCountries;
}