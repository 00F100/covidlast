import express from 'express';
import { IController, IHandlerInput } from '.';
import { IView } from './IView';

export interface IApplication {

  /**
   * Method to listen port of Application
   *
   * @param port string | number
   * @return boolean
   */
  listen(port?: string | number): boolean;

  /**
   * Method to execute handler action
   *
   * @param input IHandlerInput
   * @return boolean
   */
  handler(input: IHandlerInput): boolean;

  /**
   * Method to get controller instance
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return T
   */
  controller<T>(name: string, request?: express.Request, response?: express.Response): T;

  /**
   * Method to get view
   *
   * @return IView
   */
  view(): IView;
}