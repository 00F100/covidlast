import { ICollection } from './interfaces';

export class Collection implements ICollection {
  
  protected _data: any;

  public toJSON = (): string => {
    return JSON.stringify(this._data);
  }
}