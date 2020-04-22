import * as sprintf from 'sprintf-js';
import request from 'sync-request';
import { Response } from 'then-request';
import { Collection } from '../collection';
import { Logger } from '../logger';
import { ICollectionWorldOMeters } from './interfaces';


export class CollectionWorldOMeters extends Collection implements ICollectionWorldOMeters {

  /**
   * Method to construct instance of Collection World O Meters
   *
   * @param _host string
   * @param _method string
   * @param _path string
   * @return void
   */
  public constructor(
    private _host: string,
    private _method: string,
    private _path: string
  ) {
    super();
  }

  /**
   * Method to get data from World O Meters by Country alias
   *
   * @param alias string
   * @return ICollectionWorldOMeters
   */
  public getByCountryAlias = (alias: string): ICollectionWorldOMeters => {

    const {
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH
    } = process.env;

    Logger.get().debug('Get data from World O Meters', {
      hostname: EXTRACT_TARGET_HOSTNAME,
      method: EXTRACT_TARGET_METHOD,
      path: EXTRACT_TARGET_PATH
    });

    const {
      body,
      statusCode
    } = this.request([ alias ]);

    Logger.get().debug(`Request to World O Meters status code "${statusCode}"`);

    const bodyString = body.toString();
    
    // const content = bodyString.match(/coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g);
    // let json = content[0].replace('coronavirus-cases-linear\', ', '').slice(0, -2);
    // json = json.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    // json = json.replace(/'/g, '"');
    // const obj = JSON.parse(json);

    return this;
  }

  /**
   * Method to get data from request to World O Meters
   *
   * @param params string[]
   * @return Response
   */
  private request = (params: string[]): Response => {
    if (this._method === 'GET') return request('GET', `${this._host}${sprintf.vsprintf(this._path, params)}`);
  }
}