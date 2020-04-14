import * as express from 'express';
import { IController } from '.';

export interface IFactory {

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return IController
   */
  getController(name: string, request?: express.Request, response?: express.Response): IController
}