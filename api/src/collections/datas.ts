import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { IModelCountry, IModelData, IModelRegexResponse } from '../models';
import { ICollectionsDatas, ICollectionIntegrationResult } from './interfaces';
import { Logger } from '../logger';

export class CollectionDatas extends Collection implements ICollectionsDatas {

  /**
   * Data of colllection
   * @param IModelData[]
   */
  protected _data: IModelData[] = [];

  protected _integrationResult: ICollectionIntegrationResult = {
    total: 0,
    success: 0,
    error: 0,
    duplicate: 0
  };

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
    const rows = this._databaseSQLite3.prepare(`SELECT
        d.id,
        d.cases,
        d.deaths,
        d.timestamp,
        c.name AS countryName,
        c.id AS countryId,
        c.population,
        c.color,
        strftime('%m-%d-%Y', datetime(d.timestamp, 'unixepoch')) AS date
      FROM data AS d
      INNER JOIN countries AS c ON d.idCountry = c.id
      ORDER BY d.timestamp ASC, c.name ASC`).all();
    rows.map(row => {
      this.populateModel(this._factoryModelData, row, this._data);
    });
    return this;
  }

  /**
   * Method to create datas by regex response
   *
   * @param modelCountry IModelCountry
   * @param modelWorldOMeters IModelRegexResponse
   * @return ICollectionsDatas
   */
  public createFromIntegration = (modelCountry: IModelCountry, modelWorldOMeters: IModelRegexResponse): ICollectionsDatas => {
    if (modelWorldOMeters.days.length > 0) {

      const total = () => this._integrationResult.total++;
      const success = () => this._integrationResult.success++;
      const error = () => this._integrationResult.error++;
      const duplicate = () => this._integrationResult.duplicate++;
      
      modelWorldOMeters.days.map((day, index) => {
        total();
        
        const isUnique = this._databaseSQLite3
          .prepare(`SELECT
              COUNT(d.id) AS total
            FROM data AS d
            WHERE idCountry = ? AND timestamp = ?`)
          .get(modelCountry.id, +day);

        if (isUnique.total === 0) {

          const cases = modelWorldOMeters.data[index];

          try {
            this._databaseSQLite3
              .prepare(`INSERT INTO data (idCountry, cases, deaths, timestamp) VALUES (?, ?, ?, ?)`)
              .run(modelCountry.id, cases, 0, day);

            success();
          } catch (err) {
            error();
          }
        } else {
          duplicate();
        }
      });

      Logger.get().info('Integration datasource result', this._integrationResult);
    }
    
    return this;
  }
}