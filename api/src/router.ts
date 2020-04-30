import { IApplication, IRoute, IRouteMethods, IRouter } from '.';

export class Router implements IRouter {

  /**
   * Method to mount enable routes
   *
   * @param application IApplication
   * @return IRoute[]
   */
  public mount = (application: IApplication): IRoute[] => {
    return [
      // {
      //   method: IRouteMethods.GET,
      //   path: '/',
      //   beforeRequest: context => {
      //     context.cache = application.view('home', {
      //       cases: application.controller('cases').toJSON()
      //     });
      //   }
      // },
      {
        method: IRouteMethods.GET,
        path: '/status',
        beforeRequest: context => {
          context.cache = application.view('status', {
            status: 'Application running!'
          });
        }
      },
      {
        method: IRouteMethods.GET,
        path: '/cases',
        beforeRequest: context => {
          context.header = 'application/json';
          context.cache = application.view('json', {
            cases: application.controller('cases').getData()
          });
        }
      }
    ];
  }
}