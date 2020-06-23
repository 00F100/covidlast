import { IRoute, IRouteMethods, IRouter } from '.';

export class Router implements IRouter {

  /**
   * Method to mount enable routes
   *
   * @return IRoute[]
   */
  public mount = (): IRoute[] => {

    return [
      {
        method: IRouteMethods.GET,
        path: '/status',
        controller: 'status'
      },
      {
        method: IRouteMethods.GET,
        path: '/countries',
        controller: 'countries'
      },
      {
        method: IRouteMethods.GET,
        path: '/countries/top5',
        controller: 'countriesTop5'
      },
      {
        method: IRouteMethods.GET,
        path: '/cases',
        controller: 'cases'
      }
    ];
  }
}