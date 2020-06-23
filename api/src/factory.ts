import sqlite3 from 'better-sqlite3';
import express from 'express';
import md5 from 'md5';
import { IFactory, Response, Router, View } from '.';
import { CollectionCases, CollectionCountries, CollectionDatas, CollectionWorldOMeters } from './collections';
import { ExtractCommand, TestDatasourceCommand } from './commands';
import { ControllerCases, ControllerStatus, ControllerCountries, ControllerCountriesTop5 } from './controllers';
import { HelperWorldOMetersActiveFilter, HelperWorldOMetersCasesFilter, HelperWorldOMetersDateFixFilter, HelperWorldOMetersDeathsFilter, IHelperWorldOMetersActiveFilter, IHelperWorldOMetersCasesFilter, IHelperWorldOMetersDateFixFilter, IHelperWorldOMetersDeathsFilter } from './helpers';
import { ICommand, IController, IResponse, IRouter, IView } from './interfaces';
import { ModelCase, ModelCountry, ModelData, ModelHtmlResponse, ModelParseResultIntegration } from './models';

export class Factory implements IFactory {

  /**
   * SQLite connection
   * @param sqlite3.Database
   */
  private _sqliteConnection: sqlite3.Database[] = [];

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
  public getController = <T> (name: string, request?: express.Request, response?: express.Response): T | any => {
    if (name === 'status') return new ControllerStatus();
    if (name === 'cases') return new ControllerCases(this.getCollection('datas'), this.getCollection('cases'), request, response);
    if (name === 'countries') return new ControllerCountries();
    if (name === 'countriesTop5') return new ControllerCountriesTop5();
    throw new Error(`Controller "${name}" not found`);
  }

  /**
   * Method to create instance of collection
   *
   * @param name string
   * @throws Error Collection not found
   * @return any
   */
  public getCollection = (name: string, connection: string = null): any => {

    const {
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH
    } = process.env;

    if (name === 'datas') return new CollectionDatas(
      this.getSQLiteConnection(connection),
      () => { return new ModelData() }
    );
    if (name === 'cases') return new CollectionCases(
      () => { return new ModelCase() }
    );
    if (name === 'countries') return new CollectionCountries(
      this.getSQLiteConnection(connection),
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

    const {
      DATASOURCE_lOCATION_ORIGINAL
    } = process.env;

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

    if (command === 'test-datasource') return new TestDatasourceCommand(
      this.getCollection('datas', DATASOURCE_lOCATION_ORIGINAL),
      this.getCollection('datas')
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
   * Method to get view response
   *
   * @return IView
   */
  public getView = (): IView => {
    return new View();
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
  private getSQLiteConnection = (connection: string = null): sqlite3.Database => {

    const {
      DATASOURCE_lOCATION
    } = process.env;

    const hash = md5(connection || DATASOURCE_lOCATION || ':memory:');

    if (!this._sqliteConnection[hash]) {
      this._sqliteConnection[hash] = sqlite3(connection || DATASOURCE_lOCATION || ':memory:');
    }

    return this._sqliteConnection[hash];
  }
}