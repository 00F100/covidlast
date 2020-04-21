import * as sqlite3 from 'better-sqlite3';
import * as sprintf from 'sprintf-js';
import request from 'sync-request';
import { Collection } from '../collection';
import { ICollectionWorldOMeters } from './interfaces';
import { Logger } from '../logger';

export class CollectionWorldOMeters extends Collection implements ICollectionWorldOMeters {

  public constructor(
    private _databaseSQLite3: sqlite3.Database,
  ) {
    super();
  }

  public getByCountryId = (id: number): ICollectionWorldOMeters => {

    const {
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH
    } = process.env;

    Logger.get().debug(`Try find country in datasource on id "${id}"`);

    const rows = this._databaseSQLite3.prepare(`SELECT
        c.alias
      FROM countries AS c
      WHERE c.id = ?
      ORDER BY c.name ASC`).all(id);
    rows.map(row => {
      Logger.get().debug('Get country in datasource, get data from World O Meters', row);
      const response = this.request(EXTRACT_TARGET_METHOD, `${EXTRACT_TARGET_HOSTNAME}${sprintf.vsprintf(EXTRACT_TARGET_PATH, [ id ])}`);
      Logger.get().debug(`Request to World O Meters status code "${response.statusCode}"`);
      const body = response.getBody().toString();
      
    });

    return this;
  }

  private request = (method: string, url: string) => {
    if (method === 'GET') return request('GET', url);
  }
}