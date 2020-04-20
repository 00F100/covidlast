import express from 'express';
import { ICollection } from '.';

export interface IApplication {

  /**
   * Method to listen port of Application
   *
   * @param port string | number
   * @return boolean
   */
  listen(port?: string | number): boolean;

  /**
   * Method to get controller instance
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @return ICollection
   */
  controller(name: string, request?: express.Request, response?: express.Response): ICollection;

  /**
   * Method to get view page
   *
   * @param page string
   * @throws Error
   * @return string
   */
  view(page: string, params?: object): string | object;
}