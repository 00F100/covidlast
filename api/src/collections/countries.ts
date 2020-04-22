import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { ICollectionCountries } from './interfaces';
import { IModelCountry } from '../models';
import { Logger } from '..';

export class CollectionCountries extends Collection implements ICollectionCountries {

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
   * @return IModelCountry
   */
  public getById = (id: number): IModelCountry => {
    
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

    const model = this._factoryModelCountry();
    model.load(country);
    Logger.get().debug(`Country "${model.id}, ${model.name}" selected!`);
    return model;
  }
}