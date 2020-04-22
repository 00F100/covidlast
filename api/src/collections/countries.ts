import * as sqlite3 from 'better-sqlite3';
import { Logger } from '..';
import { Collection } from '../collection';
import { IModelCountry } from '../models';
import { ICollectionCountries } from './interfaces';

export class CollectionCountries extends Collection implements ICollectionCountries {

  /**
   * Data of colllection
   * @param IModelCountry[]
   */
  protected _data: IModelCountry[] = [];

  /**
   * Method to construct instance of Collection Countries
   *
   * @param _databaseSQLite3 sqlite3.Database
   * @param _factoryModelCountry () => IModelCountry
   */
  public constructor(
    private _databaseSQLite3: sqlite3.Database,
    private _factoryModelCountry: () => IModelCountry
  ) {
    super();
  }

  /**
   * Method to get country by id
   *
   * @param id number
   * @return ICollectionCountries
   */
  public getById = (id: number): ICollectionCountries => {
    
    Logger.get().debug(`Find country "${id}" in datasource`);

    const country = this._databaseSQLite3.prepare(`SELECT
        c.id,
        c.name,
        c.alias,
        c.population,
        c.color
      FROM countries AS c
      WHERE c.id = ?
      ORDER BY c.name ASC`).get(id);

    if (!country) {
      Logger.get().fatal(`Country "${id}" not found!`);
      throw new Error(`Country "${id}" not found!`);
    }

    this.populateModel(this._factoryModelCountry, country, this._data);

    Logger.get().debug(`Country "${country.id}, ${country.name}" selected!`);
    
    return this;
  }
}