import { Collection } from '../collection';
import { IModelData } from '../models';
import { ICollectionsCases, ICollectionsDatas } from './interfaces';

export class CollectionDatas extends Collection implements ICollectionsDatas {

  protected _data: IModelData[];

  public constructor(
    private _factoryModelData: () => IModelData
  ) {
    super();
  }

  public getOrderByDate = (): ICollectionsDatas => {
    return this;
  }
}