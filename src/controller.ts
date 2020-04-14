import { IController, ICollection } from './interfaces';

export class Controller implements IController {

  /**
   * Method default to execute on call controller
   *
   * @return ICollection
   */
  public execute = (): ICollection => {
    return null;
  }
}