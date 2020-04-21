import * as express from 'express';
import { ICommand, IController, IResponse, IRouter } from '.';

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

  /**
   * Method to get Command instance
   *
   * @param command string
   * @return ICommand
   */
  getCommand(command: string): ICommand;

  /**
   * Method to get response of request
   *
   * @return IResponse
   */
  getResponse(): IResponse;
}