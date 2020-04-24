import { ICollection, ICollectionsDatas } from '../..';

export interface ICollectionsCases extends ICollection {

  /***
   * Method to get cases dy data
   *
   * @param collectionDatas ICollectionsDatas
   * @return ICollectionsCases
   */
  getByCountry(collectionDatas: ICollectionsDatas): ICollectionsCases;
}