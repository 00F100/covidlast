import * as express from 'express';
import { ICommand, IController, IResponse, IRouter, IView } from '.';

export interface IFactory {

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return T
   */
  getController<T>(name: string, request?: express.Request, response?: express.Response): T;

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

  /**
   * Method to get view response
   *
   * @return IView
   */
  getView(): IView;
}