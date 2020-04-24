import * as express from 'express';
import { ICollectionsCases, ICollectionsDatas, IControllerCases } from '..';
import { Controller } from '../controller';

export class ControllerCases extends Controller implements IControllerCases {

  /**
   * Method to construct instance of Controller Cases
   *
   * @param _collectionDatas ICollectionsDatas
   * @param _collectionCases ICollectionsCases
   * @param _request express.Request
   * @param _response express.Response
   */
  public constructor(
    private _collectionDatas: ICollectionsDatas,
    private _collectionCases: ICollectionsCases,
    private _request?: express.Request,
    private _response?: express.Response
  ) {
    super();
  }

  /**
   * Method to execute on call this controller
   *
   * @return ICollectionsCases
   */
  public execute = (): ICollectionsCases => {
    return this._collectionCases.getByCountry(this._collectionDatas.getOrderByDate());
  }
}