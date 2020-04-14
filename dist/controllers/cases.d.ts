import * as express from 'express';
import { ICollectionsCases, ICollectionsDatas } from '../collections/interfaces';
import { Controller } from '../controller';
import { IControllerCases } from './interfaces';
export declare class ControllerCases extends Controller implements IControllerCases {
    private _collectionDatas;
    private _collectionCases;
    private _request?;
    private _response?;
    /**
     * Method to construct instance of Controller Cases
     *
     * @param _collectionDatas ICollectionsDatas
     * @param _collectionCases ICollectionsCases
     * @param _request express.Request
     * @param _response express.Response
     */
    constructor(_collectionDatas: ICollectionsDatas, _collectionCases: ICollectionsCases, _request?: express.Request, _response?: express.Response);
    /**
     * Method to execute on call this controller
     *
     * @return ICollectionsCases
     */
    execute: () => ICollectionsCases;
}
