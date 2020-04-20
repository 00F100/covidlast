import { IApplication, IRoute } from '.';

export interface IRouter {

  /**
   * Method to mount routes
   *
   * @param application IApplication
   * @return IRoute[]
   */
  mount(application: IApplication): IRoute[];
}