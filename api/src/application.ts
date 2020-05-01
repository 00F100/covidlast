import express from 'express';
import * as fs from 'fs';
import Log4js from 'log4js';
import { Factory, IApplication, ICollection, ICommand, IFactory, IHandlerInput, IRoute, IRouter, Logger, IView } from '.';

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
   * Method to get view
   *
   * @return IView
   */
  public view = (): IView => {
    // public view = (page: string, params?: object): string | object => {
    return this._factory.getView();
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
      if (typeof route.onCreate === 'function') {
        this._logger.info(`Execute onCreate to route "${route.method} ${route.path}"`);
        route.onCreate(route);
      }
      dispach[route.method.toLowerCase()](route.path, (request: express.Request, response: express.Response) => {
        if (typeof route.onExecute === 'function') {
          this._logger.info(`Execute onExecute to route "${route.method} ${route.path}"`);
          route.onExecute(route);
        }
        this._logger.info(`Request to route ${request.path} by ${request.ip}`);
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