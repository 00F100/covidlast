import * as express from 'express';
import { IFactory } from '.';
import { ControllerCases } from './controllers';
import { ICollection, IController } from './interfaces';

export class Factory implements IFactory {

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @throws Error Controller not found
   * @return IController
   */
  public getController = (name: string, request: express.Request, response: express.Response): IController => {
    if (name === 'cases') return new ControllerCases(this.getCollection(name), request, response);
    throw new Error(`Controller "${name}" not found`);
  }

  /**
   * Method to create isntance of collection
   *
   * @param name string
   * @return ICollection
   */
  public getCollection = (name: string): ICollection => {
    if (name === 'cases') return new CollectionCases();
    throw new Error(`Collection "${name}" not found`);
  }
}