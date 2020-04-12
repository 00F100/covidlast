import * as express from 'express';
import * as fs from 'fs';
import { IApplication, IFactory } from '.';
import { Factory } from './factory';
import { ICollection } from './interfaces';

const {
  VIEW_HOME
} = process.env;

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
      Application.instance = new Application(new Factory());
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
    const dispach = express();
    this.routes(dispach);
    dispach.listen(this.port(port), () => console.log(`Application UP on port "${port}"`));
    return true;
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

  /**
   * Method to mount routes and call controllers
   *
   * @param dispach express.Router
   * @return void
   */
  private routes = (dispach: express.Router): void => {
    dispach.get('/', (request: express.Request, response: express.Response) => {
      const home = this.view('home', {
        cases: this.controller('cases', request, response).toObject()
      });
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
  private controller = (name: string, request: express.Request, response: express.Response): ICollection => {
    return this._factory.getController(name, request, response).execute();
  }

  /**
   * Method to get view page
   *
   * @param page string
   * @throws Error
   * @return string
   */
  private view = (page: string, params: object): string => {
    const file = `${__dirname}/view/templates/${page}.html`;
    if (fs.existsSync(file)) {
      let data = fs.readFileSync(file).toString();
      data = this.applyParams(data, params);
      return data;
    }
    throw new Error(`View "${file}" not found`);
  }

  /**
   * Method to apply parameters into view
   *
   * @param data string
   * @param params any
   * @return string
   */
  private applyParams = (data: string, params: any): string => {
    for (const i in params) {
      data = data.replace(`\$\[${i}\]`, params[i]);
    }
    return data;
  }
}