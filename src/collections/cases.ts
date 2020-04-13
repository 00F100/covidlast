import { Collection } from '../collection';
import { IModelCase } from '../models';
import { ICollectionsCases, ICollectionsDatas } from './interfaces';

export class CollectionCases extends Collection implements ICollectionsCases {

  protected _data: IModelCase[];

  public constructor(
    private _factoryModelCase: () => IModelCase
  ) {
    super();
  }

  public getByCountry = (collectionDatas: ICollectionsDatas): ICollectionsCases => {
    return this;
  }
}