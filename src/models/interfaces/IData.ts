import { IModelCountry } from '.';
import { IModel } from '../../interfaces';

export interface IModelData extends IModel {
  id: number;
  cases: number;
  deaths: number;
  timestamp: number;
  date: Date;
  country: IModelCountry ;
}