import sqlite3 from 'better-sqlite3';
import express from 'express';
import { IFactory, ModelCase, Response, Router, ExtractCommand } from '.';
import { CollectionCases, CollectionDatas, CollectionCountries } from './collections';
import { ControllerCases } from './controllers';
import { ICommand, IController, IResponse, IRouter } from './interfaces';
import { ModelData, ModelCountry } from './models';
import { CollectionWorldOMeters } from './collections/worldOMeters';

export class Factory implements IFactory {

  /**
   * SQLite connection
   * @param sqlite3.Database
   */
  private _sqliteConnection: sqlite3.Database = null;

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

    if (name === 'datas') return new CollectionDatas(
      this.getSQLiteConnection(),
      () => { return new ModelData() }
    );
    if (name === 'cases') return new CollectionCases(
      () => { return new ModelCase() }
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
      EXTRACT_TARGET_HOSTNAME,
      EXTRACT_TARGET_METHOD,
      EXTRACT_TARGET_PATH
    } = process.env;

    if (command === 'extract') return new ExtractCommand(
      new CollectionCountries(
        this.getSQLiteConnection(),
        () => { return new ModelCountry() }
      ),
      new CollectionWorldOMeters(
        EXTRACT_TARGET_HOSTNAME,
        EXTRACT_TARGET_METHOD,
        EXTRACT_TARGET_PATH
      )
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