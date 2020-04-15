import { IRouter, IRoute, IApplication } from './interfaces';

export class Router implements IRouter {

  /**
   * Method to mount enable routes
   *
   * @param application IApplication
   * @return IRoute[]
   */
  public mount = (application: IApplication): IRoute[] => {
    return [
      {
        method: 'GET',
        path: '/',
        beforeRequest: context => {
          context.cache = application.view('home', {
            cases: application.controller('cases').toJSON()
          });
        }
      }
    ];
  }
}