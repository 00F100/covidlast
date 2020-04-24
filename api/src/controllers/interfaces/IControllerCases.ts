import { ICollectionsCases, IController } from '../..';

export interface IControllerCases extends IController {

  /**
   * Method to execute on call this controller
   *
   * @return ICollectionsCases
   */
  execute(): ICollectionsCases;
}