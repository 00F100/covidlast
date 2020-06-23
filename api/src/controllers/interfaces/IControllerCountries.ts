import express from 'express';
import { IApplication, IController, IRoute } from '../..';

export interface IControllerCountries extends IController {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  onCreate: (application: IApplication, context: IRoute) => void;
}