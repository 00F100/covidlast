import sqlite3 from 'better-sqlite3';
import express from 'express';
import { IFactory, Response, Router } from '.';
import { CollectionCases, CollectionCountries, CollectionDatas, CollectionWorldOMeters } from './collections';
import { ExtractCommand } from './commands';
import { ControllerCases } from './controllers';
import { IHelperWorldOMetersCasesFilter, HelperWorldOMetersCasesFilter, HelperWorldOMetersDateFixFilter, IHelperWorldOMetersDateFixFilter, HelperWorldOMetersDeathsFilter, IHelperWorldOMetersDeathsFilter, IHelperWorldOMetersActiveFilter, HelperWorldOMetersActiveFilter } from './helpers';
import { ICommand, IController, IResponse, IRouter } from './interfaces';
import { ModelCase, ModelCountry, ModelData, ModelHtmlResponse, ModelParseResultIntegration } from './models';

export class Factory implements IFactory {

  /**
   * SQLite connection
   * @param sqlite3.Database
   */
  private _sqliteConnection: sqlite3.Database = null;

  /**
   * List of instances singleton
   * @param any[]
   */
  private _singleton: any[] = [];

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @throws Error Controller not found
   * @return IController
   */
  public getController = (name: string, request?: express.Request, response?: express.Response): IController => {
    if (name === 'cases') return new ControllerCases(this.getCollection('datas'), this.getCollection('cases'), request, response);
    throw new Error(`Controller "${name}" not found`);
  }

  /**
   * Method to create instance of collection
   *
   * @param name string
   * @throws Error Collection not found
   * @return any
   */
  public getCollection = (name: string): any => {

    const {
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH
    } = process.env;

    if (name === 'datas') return new CollectionDatas(
      this.getSQLiteConnection(),
      () => { return new ModelData() }
    );
    if (name === 'cases') return new CollectionCases(
      () => { return new ModelCase() }
    );
    if (name === 'countries') return new CollectionCountries(
      this.getSQLiteConnection(),
      () => { return new ModelCountry() }
    );
    if (name === 'worldometers') return new CollectionWorldOMeters(
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH,
      () => { return new ModelHtmlResponse() }
    );
    throw new Error(`Collection "${name}" not found`);
  }

  /**
   * Method to get Router instance
   *
   * @return IRouter
   */
  public getRouter = (): IRouter => {
    return new Router();
  }

  /**
   * Method to get command instance
   *
   * @param command string
   * @return ICommand
   */
  public getCommand = (command: string): ICommand => {

    if (command === 'extract') return new ExtractCommand(
      this.getCollection('countries'),
      this.getCollection('worldometers'),
      this.getCollection('datas'),
      this.getHelper<IHelperWorldOMetersCasesFilter>('worldometerscasesfilter'),
      this.getHelper<IHelperWorldOMetersDeathsFilter>('worldometersdeathsfilter'),
      this.getHelper<IHelperWorldOMetersActiveFilter>('worldometersactivefilter'),
      this.getHelper<IHelperWorldOMetersDateFixFilter>('worldometersdatefixfilter'),
      () => { return new ModelParseResultIntegration() }
    );
    throw new Error(`Command "${command}" not found`);
  }

  /**
   * Method to get response of request
   *
   * @return IResponse
   */
  public getResponse = (): IResponse => {
    return new Response();
  }

  /**
   * Method to get helper
   *
   * @param name string
   * @return T
   */
  private getHelper = <T> (name: string): T => {
    if (!this._singleton[name]) {
      if (name === 'worldometerscasesfilter') this._singleton[name] = new HelperWorldOMetersCasesFilter();
      if (name === 'worldometersdeathsfilter') this._singleton[name] = new HelperWorldOMetersDeathsFilter();
      if (name === 'worldometersactivefilter') this._singleton[name] = new HelperWorldOMetersActiveFilter();
      if (name === 'worldometersdatefixfilter') this._singleton[name] = new HelperWorldOMetersDateFixFilter();
    }
    return this._singleton[name];
  }

  /**
   * Method to get SQLite connection
   *
   * @return sqlite3.Database
   */
  private getSQLiteConnection = (): sqlite3.Database => {

    const {
      DATASOURCE_lOCATION
    } = process.env;

    if (!this._sqliteConnection) {
      this._sqliteConnection = sqlite3(DATASOURCE_lOCATION || ':memory:');
    }

    return this._sqliteConnection;
  }
}