import { ICollection } from '.';

export interface IController {

  /**
   * Method to execute on call controller
   *
   * @return ICollection
   */
  execute(): ICollection;
}