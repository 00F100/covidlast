import * as express from 'express';
import { ICollectionsCases, ICollectionsDatas } from '../collections/interfaces';
import { IController } from '../interfaces';

export class ControllerCases implements IController {
  public constructor(
    private _collectionDatas: ICollectionsDatas,
    private _collectionCases: ICollectionsCases,
    private _request: express.Request,
    private _response: express.Response
  ) {
  }

  public execute = (): ICollectionsCases => {
    return this._collectionCases.getByCountry(this._collectionDatas.getOrderByDate());
  }
}