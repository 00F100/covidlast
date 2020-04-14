import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { IModelCase } from '../models';
import { ICollectionsCases, ICollectionsDatas } from './interfaces';
export declare class CollectionCases extends Collection implements ICollectionsCases {
    private _databaseSQLite3;
    private _factoryModelCase;
    /**
     * Data of collection
     * @param IModelCase[]
     */
    protected _data: IModelCase[];
    /**
     * Method to construct instance of Collection Cases
     *
     * @param _databaseSQLite3 sqlite3.Database
     * @param _factoryModelCase () => IModelCase
     * @return void
     */
    constructor(_databaseSQLite3: sqlite3.Database, _factoryModelCase: () => IModelCase);
    /**
     * Method to get cases from data
     *
     * @param collectionDatas ICollectionsDatas
     * @return ICollectionsCases
     */
    getByCountry: (collectionDatas: ICollectionsDatas) => ICollectionsCases;
}
