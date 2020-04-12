import { ICollection } from '.';

export interface IController {

  /**
   * Method to execute controller action
   *
   * @return ICollection
   */
  execute(): ICollection;
}