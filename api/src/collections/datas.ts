import * as sqlite3 from 'better-sqlite3';
import { ICollectionIntegrationResult, ICollectionsDatas, IModelCountry, IModelData, IModelParseResultIntegration, Logger } from '..';
import { Collection } from '../collection';
import moment from 'moment';

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
    ignore: 0,
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
   * Method to get data to compare
   *
   * @return ICollectionsDatas
   */
  public getDataToCompare = (): ICollectionsDatas => {
    const rows = this._databaseSQLite3.prepare(`SELECT DISTINCT
        c.name AS countryName,
        (SELECT dd.cases FROM data AS dd WHERE dd.idCountry = c.id ORDER BY dd.cases DESC LIMIT 1) AS cases
      FROM data AS d
      INNER JOIN countries AS c ON c.id = d.idCountry
      ORDER BY c.name ASC`).all();
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
        duplicate,
        ignore
      } = this.getIntegrationAccounting();

      modelWorldOMeters.days.map((day, index) => {
        total();
        if (this.isUniqueDataByCountryAndTimestamp(modelCountry.id, +day)) {

          const model = this._factoryModelData();

          model.load<IModelData>({
            countryId: modelCountry.id,
            active: +modelWorldOMeters.active[index],
            cases: +modelWorldOMeters.cases[index],
            deaths: +modelWorldOMeters.deaths[index],
            timestamp: +day
          });

          try {
            if (model.validate()) {
              this.insert(model);
              Logger.get().debug('Success try INSERT', model.toObject());
              success();
            } else {
              Logger.get().error('Ignore on try INSERT', model.toObject());
              ignore();
            }
          } catch (err) {
            Logger.get().error('Error on try INSERT', model.toObject());
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
   * @param model IModelData
   * @return sqlite3.RunResult
   */
  private insert = (model: IModelData): sqlite3.RunResult => {
    return this._databaseSQLite3
      .prepare(`INSERT INTO data (idCountry, cases, deaths, active, timestamp) VALUES (?, ?, ?, ?, ?)`)
      .run(model.countryId, model.cases, model.deaths, model.active, model.timestamp);
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
      ignore: () => this._integrationResult.ignore++,
      duplicate: () => this._integrationResult.duplicate++,
    };
  }
}