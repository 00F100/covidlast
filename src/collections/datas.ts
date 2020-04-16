import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { IModelData } from '../models';
import { ICollectionsDatas } from './interfaces';

export class CollectionDatas extends Collection implements ICollectionsDatas {

  /**
   * Data of colllection
   * @param IModelData[]
   */
  protected _data: IModelData[] = [];

  /**
   * Method to construct instance of CollectionDatas
   *
   * @param _databaseSQLite3 sqlite3.Database
   * @param _factoryModelData () => IModelData
   * @return void
   */
  public constructor(
    private _databaseSQLite3: sqlite3.Database,
    private _factoryModelData: () => IModelData
  ) {
    super();
  }

  /**
   * Method to get data of cases with order by date ASC
   *
   * @return ICollectionsDatas
   */
  public getOrderByDate = (): ICollectionsDatas => {
    const rows = this._databaseSQLite3.prepare(`
      SELECT
        d.id, d.cases, d.deaths, d.timestamp, c.name AS countryName, c.id AS countryId, c.population,
        strftime('%m-%d-%Y', datetime(d.timestamp, 'unixepoch')) AS date
      FROM data AS d
      INNER JOIN countries AS c ON d.idCountry = c.id
      ORDER BY d.timestamp ASC, c.name ASC`).all();
    rows.map(row => {
      const model = this._factoryModelData();
      model.load(row);
      this._data.push(row);
    });
    return this;
  }
}