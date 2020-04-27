import * as sqlite3 from 'better-sqlite3';
import { ICollectionIntegrationResult, ICollectionsDatas, IModelCountry, IModelData, IModelParseResultIntegration, Logger } from '..';
import { Collection } from '../collection';

export class CollectionDatas extends Collection implements ICollectionsDatas {

  /**
   * Data of colllection
   * @param IModelData[]
   */
  protected _data: IModelData[] = [];

  /**
   * Integration result data
   * @param ICollectionIntegrationResult
   */
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
        d.active,
        d.timestamp,
        c.name AS countryName,
        c.id AS countryId,
        c.population,
        c.color,
        strftime('%m-%d-%Y', datetime(d.timestamp, 'unixepoch')) AS date
      FROM data AS d
      INNER JOIN countries AS c ON d.idCountry = c.id
      ORDER BY c.name ASC, d.timestamp ASC`).all();
    rows.map(row => {
      this.populateModel(this._factoryModelData, row, this._data);
    });
    return this;
  }

  /**
   * Method to create datas after regex process HTML
   *
   * @param modelCountry IModelCountry
   * @param modelWorldOMeters IModelParseResultIntegration
   * @return ICollectionsDatas
   */
  public createCaseFromIntegration = (modelCountry: IModelCountry, modelWorldOMeters: IModelParseResultIntegration): ICollectionsDatas => {
    if (modelWorldOMeters.days.length > 0) {

      const {
        total,
        success,
        error,
        duplicate
      } = this.getIntegrationAccounting();

      modelWorldOMeters.days.map((day, index) => {
        total();
        if (this.isUniqueDataByCountryAndTimestamp(modelCountry.id, +day)) {
          const cases = modelWorldOMeters.cases[index];
          const active = modelWorldOMeters.active[index];
          const deaths = modelWorldOMeters.deaths[index];
          try {
            this.insert(modelCountry.id, cases, deaths, active, +day);
            Logger.get().debug('Success try INSERT', {cases, day, country: modelCountry, deaths: 0});
            success();
          } catch (err) {
            Logger.get().error('Error on try INSERT', {err, cases, day, country: modelCountry, deaths: 0});
            error();
          }
        } else {
          Logger.get().debug('Duplicate on try INSERT', {day, country: modelCountry});
          duplicate();
        }
      });
      Logger.get().info('Integration datasource result', this._integrationResult);
    }

    return this;
  }

  /**
   * Method to check if data is unique
   *
   * @param idCountry number
   * @param timestamp number
   * @return boolean
   */
  private isUniqueDataByCountryAndTimestamp = (idCountry: number, timestamp: number): boolean => {
    return this._databaseSQLite3
      .prepare(`SELECT
          COUNT(d.id) AS total
        FROM data AS d
        WHERE idCountry = ? AND timestamp = ?`)
      .get(idCountry, timestamp).total === 0;
  }

  /**
   * Method to insert data
   *
   * @param idCountry number
   * @param cases number
   * @param deaths number
   * @param active number
   * @param timestamp number
   * @return sqlite3.RunResult
   */
  private insert = (idCountry: number, cases: number, deaths: number, active: number, timestamp: number): sqlite3.RunResult => {
    return this._databaseSQLite3
      .prepare(`INSERT INTO data (idCountry, cases, deaths, active, timestamp) VALUES (?, ?, ?, ?, ?)`)
      .run(idCountry, cases, deaths, active, timestamp);
  }

  /**
   * Method to accounting integration result
   *
   * @return [index: string] : () => number
   */
  private getIntegrationAccounting = (): { [index: string] : () => number } => {
    return {
      total: () => this._integrationResult.total++,
      success: () => this._integrationResult.success++,
      error: () => this._integrationResult.error++,
      duplicate: () => this._integrationResult.duplicate++,
    };
  }
}