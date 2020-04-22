import * as sprintf from 'sprintf-js';
import request from 'sync-request';
import { Response } from 'then-request';
import { IModelHtmlResponse } from '..';
import { Collection } from '../collection';
import { Logger } from '../logger';
import { ICollectionWorldOMeters } from './interfaces';

export class CollectionWorldOMeters extends Collection implements ICollectionWorldOMeters {

  /**
   * Data of colllection
   * @param IModelHtmlResponse[]
   */
  protected _data: IModelHtmlResponse[] = [];

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
    private _path: string,
    private _factoryModelHtmlResponse: () => IModelHtmlResponse
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
      body,
      statusCode,
      headers
    } = this.request([ alias ]);

    Logger.get().debug(`Request to World O Meters status code "${statusCode}"`);

    if (+statusCode >= 200 && +statusCode < 300) {
      this.populateModel(this._factoryModelHtmlResponse, { headers, statusCode, html: body.toString() }, this._data);
    }

    return this;
  }

  /**
   * Method to get data from request to World O Meters
   *
   * @param params string[]
   * @return Response
   */
  private request = (params: string[]): Response => {
    const url: string = `${this._host}${sprintf.vsprintf(this._path, params)}`;
    const payload = {
      url,
      hostname: this._host,
      method: this._method
    };

    Logger.get().debug('Get data from World O Meters', payload);
    
    try {
      const response = request('GET', url);
      Logger.get().debug('Success on request World O Meters', payload);
      
      return response;
    } catch (err) {
      Logger.get().fatal('Error on request World O Meters', payload);
      throw err;
    }
  }
}