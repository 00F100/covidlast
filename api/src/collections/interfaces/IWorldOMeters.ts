import { ICollection } from '../../interfaces';

export interface ICollectionWorldOMeters extends ICollection {

  /**
   * Method to get data from World O Meters by Country alias
   *
   * @param alias string
   * @return ICollectionWorldOMeters
   */
  getByCountryAlias(alias: string): ICollectionWorldOMeters;
}