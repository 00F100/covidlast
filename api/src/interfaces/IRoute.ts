import express from 'express';
import { IRouteMethods } from '.';

export interface IRoute {

  /**
   * Method of request
   * @param IRouteMethods
   */
  method: IRouteMethods;

  /**
   * Path ot request
   * @param string
   */
  path: string;

  /**
   * Cache of response
   * @param string
   */
  cache?: any;

  /**
   * Response of request
   * @param string | object
   */
  response?: string | object | any;

  /**
   * Header of response
   * @param string
   */
  header?: string;

  /**
   * Behavior on create route
   * @param (context: IRoute) => void
   */
  onCreate?: (context: IRoute) => void;

  /**
   * Behavior on execute route
   * @param (context: IRoute, request: express.Request) => void
   */
  onExecute?: (context: IRoute, request: express.Request) => void;
}