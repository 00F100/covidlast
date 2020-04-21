import * as sqlite3 from 'better-sqlite3';
import { Collection } from '../collection';
import { ICollectionCountries } from './interfaces';
import { IModelCountry } from '../models';

export class CollectionCountries extends Collection implements ICollectionCountries {

  public constructor(
    private _databaseSQLite3: sqlite3.Database,
    private _factoryModelCountry: () => IModelCountry
  ) {
    super();
  }

  public getCountryById = (id: number): IModelCountry => {

  }
}