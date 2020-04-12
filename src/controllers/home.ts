import * as express from 'express';
import { ICollection, IController } from '../interfaces';

export class ControllerHome implements IController {
  public constructor(
    private _collection: ICollection,
    private _request: express.Request,
    private _response: express.Response
  ) {
  }

  public execute = (): ICollection => {
    return this._collection;
  }
}