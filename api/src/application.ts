import express from 'express';
import * as fs from 'fs';
import Log4js from 'log4js';
import { Factory, IApplication, ICollection, ICommand, IFactory, IHandlerInput, IRoute, IRouter, Logger } from '.';

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

    const {
      VIEW_INDEX
    } = process.env;

    try {
      this._logger.info(`Start web server in port "${port}"`);
      const dispach = express();
      dispach.use(express.static(VIEW_INDEX));

      this._logger.info('Load routes');
      this.routes(dispach);

      this._logger.info(`Listen port ${port}`);
      dispach.listen(this.port(port), () => this._logger.info(`Application UP on port "${port}"`));

      return true;
    } catch (err) {
      this._logger.fatal('A exception on listen Application', err);
    }
    return false;
  }

  /**
   * Method to execute handler action
   *
   * @param input IHandlerInput
   * @return boolean
   */
  public handler = (input: IHandlerInput): boolean => {
    try {
      this._logger.info(`Start handler execution`);
      this
        .command(input.command)
        .execute(input, this._factory.getResponse());
      return true;
    } catch (err) {
      this._logger.fatal('A exception on execute handler in Application', err);
    }
    return false;
  }

  /**
   * Method to get controller instance
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return ICollection
   */
  public controller = (name: string, request?: express.Request, response?: express.Response): ICollection => {
    return this._factory.getController(name, request, response).execute();
  }

  /**
   * Method to get view page
   *
   * @param page string
   * @throws Error
   * @return string
   */
  public view = (page: string, params?: object): string | object => {
    if (page === 'json') {
      return { ...params};
    }

    const {
      VIEW_INDEX
    } = process.env;

    const file = `${VIEW_INDEX}/${page}.html`;
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
   * Method to mount routes and call controllers
   *
   * @param dispach express.Router
   * @return void
   */
  private routes = (dispach: express.Router): void => {
    const router: IRouter = this._factory.getRouter();
    const routes: IRoute[] = router.mount(this);
    routes.map(route => {
      if (typeof route.beforeRequest === 'function') {
        this._logger.info(`Execute beforeRequest to route "${route.method} ${route.path}"`);
        route.beforeRequest(route);
      }
      dispach[route.method.toLowerCase()](route.path, (request: express.Request, response: express.Response) => {
        if (typeof route.afterRequest === 'function') {
          this._logger.info(`Execute afterRequest to route "${route.method} ${route.path}"`);
          route.afterRequest(route);
        }
        this._logger.debug(`Request to route ${request.path} by ${request.ip}`);
        if (!route.header) {
          route.header = 'text/html';
        }
        response.setHeader('Content-Type', route.header);
        // response.setHeader('Content-Type', 'application/json');
        // response.setHeader('Content-Type', 'text/html');
        response.send(route.cache);
      });
    });
  }

  /**
   * Method to call command
   *
   * @param command string
   * @return void
   */
  private command = (command: string): ICommand => {
    return this._factory.getCommand(command);
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