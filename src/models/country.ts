import { Model } from '../model';
import { IModelCountry } from './interfaces';

export class ModelCountry extends Model implements IModelCountry {
  public id: number = 0;
  public name: string = '';
}