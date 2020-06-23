import { IRoute } from '.';

export interface IRouter {

  /**
   * Method to mount routes
   *
   * @return IRoute[]
   */
  mount(): IRoute[];
}