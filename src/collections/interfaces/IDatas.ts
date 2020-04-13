import { ICollection } from '../../interfaces';

export interface ICollectionsDatas extends ICollection {
  getOrderByDate(): ICollectionsDatas;
}