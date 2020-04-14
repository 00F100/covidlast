import express from 'express';
import * as fs from 'fs';
import Log4js from 'log4js';
import { IApplication, IFactory, Logger } from '.';
import { Factory } from './factory';
import { ICollection } from './interfaces';

export class Application implements IApplication {

  /**
   * Instance of Application
   * @param IApplication
   */
  private static instance: IApplication;

  /**
   * Method to get instance singleton of Application
   *
   * @return IApplication
   */
  public static get = (): IApplication => {
    if (!Application.instance) {
      Application.instance = new Application(Logger.get(), new Factory());
    }
    return Application.instance;
  }

  /**
   * Method to construct instance of Application
   *
   * @param _factory IFactory
   * @return void
   */
  public constructor(
    private _logger: Log4js.Logger,
    private _factory: IFactory
  ) {
  }

  /**
   * Method to listen port of Application
   *
   * @param port string | number
   * @return boolean
   */
  public listen = (port?: string | number): boolean => {
    try {
      this._logger.info(`Start web server in port "${port}"`);
      const dispach = express();
      this._logger.info(`Load routes`);
      this.routes(dispach);
      this._logger.info(`Listen port`);
      dispach.listen(this.port(port), () => this._logger.info(`Application UP on port "${port}"`));
      return true;
    } catch (err) {

    }
    return false;
  }

  /**
   * Method to mount routes and call controllers
   *
   * @param dispach express.Router
   * @return void
   */
  private routes = (dispach: express.Router): void => {
    // mount home view without request execution
    const home = this.view('home', {
      cases: this.controller('cases').toJSON()
    });

    // show home cache on execute request
    dispach.get('/', (request: express.Request, response: express.Response) => {
      this._logger.debug(`Request to route ${request.path} by ${request.ip}`);
      response.send(home);
    });
  }

  /**
   * Method to get controller instance
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return ICollection
   */
  private controller = (name: string, request?: express.Request, response?: express.Response): ICollection => {
    return this._factory.getController(name, request, response).execute();
  }

  /**
   * Method to get view page
   *
   * @param page string
   * @throws Error
   * @return string
   */
  private view = (page: string, params?: object): string => {
    const file = `${__dirname}/view/${page}.html`;
    this._logger.debug(`Load view file from "${file}"`);
    if (fs.existsSync(file)) {
      let data = fs.readFileSync(file).toString();
      data = this.applyParams(data, params || []);
      return data;
    }
    this._logger.error(`File view not found "${file}"`);
    throw new Error(`View "${file}" not found`);
  }

  /**
   * Method to apply parameters into view
   *
   * @param data string
   * @param params any
   * @return string
   */
  private applyParams = (data: string, params?: object): string => {
    for (const i in params) {
      if (typeof params[i] === 'string') {
        data = data.replace(`\$\[${i}\]`, params[i]);
      }
    }
    return data;
  }

  /**
   * Method to get port of web server
   *
   * @param port string | number
   * @return number
   */
  private port = (port?: string | number): number => {
    if (!port) {
      port = 3000;
    }
    return +port;
  }
}