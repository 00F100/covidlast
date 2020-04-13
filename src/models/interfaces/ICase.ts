import { IModel } from '../../interfaces';

export interface IModelCase extends IModel {
  name: string;
  data: number[];
}