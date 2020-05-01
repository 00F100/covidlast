import moment from 'moment';
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
      {
        method: IRouteMethods.GET,
        path: '/status',
        onCreate: context => {
          context.cache = application.view().html('status', {
            status: 'Application running!',
            date: moment().utc().format('MM/DD/YYYY HH:mm:ss')
          });
        }
      },
      {
        method: IRouteMethods.GET,
        path: '/cases',
        onCreate: context => {
          const collection = application.controller('cases');
          context.cache = application.view().json(collection);
        }
      }
    ];
  }
}