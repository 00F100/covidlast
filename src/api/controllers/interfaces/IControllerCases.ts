import { ICollectionsCases } from '../../collections/interfaces';
import { IController } from '../../interfaces';

export interface IControllerCases extends IController {

  /**
   * Method to execute on call this controller
   *
   * @return ICollectionsCases
   */
  execute(): ICollectionsCases;
}