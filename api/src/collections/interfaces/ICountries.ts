import { ICollection } from '../../interfaces';
import { IModelCountry } from '../../models';

export interface ICollectionCountries extends ICollection {

  /**
   * Method to get country by id
   *
   * @param id number
   * @return IModelCountry
   */
  getById(id: number): IModelCountry;
}