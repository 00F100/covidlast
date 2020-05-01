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
   * Behavior on create route
   * @param (context: IRoute) => void
   */
  onCreate?: (context: IRoute) => void;

  /**
   * Behavior on execute route
   * @param (context: IRoute) => void
   */
  onExecute?: (context: IRoute) => void;
}