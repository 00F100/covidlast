import { IModel } from './interfaces';

export class Model implements IModel {

  /**
   * Method to load data into model
   *
   * @param data object | string[]
   * @return void
   */
  public load = (data: object | string[]): void => {
    for (const i in data) {
      if (this[i] !== undefined) {
        this[i] = data[i];
      }
    }
  }
}