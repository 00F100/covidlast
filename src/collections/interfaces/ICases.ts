import { ICollectionsDatas } from '.';
import { ICollection } from '../../interfaces';

export interface ICollectionsCases extends ICollection {
  getByCountry(collectionDatas: ICollectionsDatas): ICollectionsCases;
}