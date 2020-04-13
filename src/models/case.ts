import { Model } from '../model';
import { IModelCase } from './interfaces';

export class ModelCase extends Model implements IModelCase {
  public name: string = '';
  public data: number[] = [];
}