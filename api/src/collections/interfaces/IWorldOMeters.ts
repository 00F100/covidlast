import { ICollection } from '../../interfaces';

export interface ICollectionWorldOMeters extends ICollection {

  /**
   * Method to get data from World O Meters by Country
   *
   * @param id number
   * @return ICollectionWorldOMeters
   */
  getByCountryId(id: number): ICollectionWorldOMeters;
}