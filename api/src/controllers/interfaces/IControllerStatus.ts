import { IApplication, IController, IRoute } from '../..';

export interface IControllerStatus extends IController {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  onCreate?: (application: IApplication, context: IRoute) => void;
}