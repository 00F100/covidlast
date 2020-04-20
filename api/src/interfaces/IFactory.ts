import * as express from 'express';
import { IController, IRouter } from '.';

export interface IFactory {

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return IController
   */
  getController(name: string, request?: express.Request, response?: express.Response): IController;

  /**
   * Method to get Router instance
   *
   * @return IRouter
   */
  getRouter(): IRouter;
}