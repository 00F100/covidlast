export interface IRoute {

  /**
   * Method of request
   * @param string
   */
  method: string;

  /**
   * Path ot request
   * @param string
   */
  path: string;

  /**
   * Cache of response
   * @param string
   */
  cache?: string;

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