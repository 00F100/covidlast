import * as express from 'express';
import * as fs from 'fs';
import { IApplication, IController } from '.';
import { ControllerIndex } from './controllers';

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
      Application.instance = new Application();
    }
    return Application.instance;
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
      const index = this.view('index', {
        data: this.controller('index')
      });
      response.send(index);
    });
  }

  private controller = (name: string): IController => {
    if (name === 'index') return new ControllerIndex();
    throw new Error(`Controller "${name}" not found`);
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
      data = data.replace(`\[${i}\]`, params[i]);
    }
    return data;
  }
}