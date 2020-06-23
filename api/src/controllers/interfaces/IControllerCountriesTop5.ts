import { IApplication, IController, IRoute } from '../..';

export interface IControllerCountriesTop5 extends IController {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  onCreate: (application: IApplication, context: IRoute) => void;
}