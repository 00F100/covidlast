import { IRouteMethods } from '.';

export interface IRoute {

  /**
   * Method of request
   * @param IRouteMethods
   */
  method: IRouteMethods;

  /**
   * Path ot request
   * @param string
   */
  path: string;

  /**
   * Cache of response
   * @param string
   */
  cache?: string | object;

  /**
   * Header of response
   * @param string
   */
  header?: string;

  /**
   * Execute before request
   *
   * @param context IRoute
   * @return (context: IRoute) => void
   */
  beforeRequest?: (context: IRoute) => void;

  /**
   * Execute after request
   *
   * @param context IRoute
   * @return (context: IRoute) => void
   */
  afterRequest?: (context: IRoute) => void;
}