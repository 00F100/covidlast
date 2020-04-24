import { IController, ICollection } from '.';

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