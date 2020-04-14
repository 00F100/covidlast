import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { IModelData } from '../models';
import { ICollectionsDatas } from './interfaces';
export declare class CollectionDatas extends Collection implements ICollectionsDatas {
    private _databaseSQLite3;
    private _factoryModelData;
    /**
     * Data of colllection
     * @param IModelData[]
     */
    protected _data: IModelData[];
    /**
     * Method to construct instance of CollectionDatas
     *
     * @param _databaseSQLite3 sqlite3.Database
     * @param _factoryModelData () => IModelData
     * @return void
     */
    constructor(_databaseSQLite3: sqlite3.Database, _factoryModelData: () => IModelData);
    /**
     * Method to get data of cases with order by date ASC
     *
     * @return ICollectionsDatas
     */
    getOrderByDate: () => ICollectionsDatas;
}
