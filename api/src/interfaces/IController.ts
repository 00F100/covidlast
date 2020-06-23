import express from 'express';
import { IRoute, IApplication } from '.';

export interface IController {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  onCreate?: (application: IApplication, context: IRoute) => void;

  /**
   * Method to call on execute route
   *
   * @return (application: IApplication, context: IRoute, request: express.Request) => void
   */
  onExecute?: (application: IApplication, context: IRoute, request: express.Request) => void;
}