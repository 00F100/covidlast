import { Model } from '../model';
import { IModelCountry, IModelData } from './interfaces';

export class ModelData extends Model implements IModelData {
  public id: number = 0;
  public cases: number = 0;
  public deaths: number = 0;
  public timestamp: number = 0;
  public date: Date = new Date();
  public country: IModelCountry = {};
}