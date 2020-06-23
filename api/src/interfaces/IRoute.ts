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
   * Method to set controller of route
   * @param string
   */
  controller: string;
}