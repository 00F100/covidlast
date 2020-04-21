import sqlite3 from 'better-sqlite3';
import express from 'express';
import { IFactory, ModelCase, Response, Router, ExtractCommand } from '.';
import { CollectionCases, CollectionDatas } from './collections';
import { ControllerCases } from './controllers';
import { ICommand, IController, IResponse, IRouter } from './interfaces';
import { ModelData } from './models';

export class Factory implements IFactory {

  /**
   * Method to create instance of controller
   *
   * @param name string
   * @param request express.Request
   * @param response express.Response
   * @throws Error Controller not found
   * @return IController
   */
  public getController = (name: string, request?: express.Request, response?: express.Response): IController => {
    if (name === 'cases') return new ControllerCases(this.getCollection('datas'), this.getCollection('cases'), request, response);
    throw new Error(`Controller "${name}" not found`);
  }

  /**
   * Method to create instance of collection
   *
   * @param name string
   * @throws Error Collection not found
   * @return any
   */
  public getCollection = (name: string): any => {

    const {
      DATASOURCE_lOCATION
    } = process.env;

    if (name === 'datas') return new CollectionDatas(
      sqlite3(DATASOURCE_lOCATION || ':memory:'),
      () => { return new ModelData() }
    );
    if (name === 'cases') return new CollectionCases(
      () => { return new ModelCase() }
    );
    throw new Error(`Collection "${name}" not found`);
  }

  /**
   * Method to get Router instance
   *
   * @return IRouter
   */
  public getRouter = (): IRouter => {
    return new Router();
  }

  /**
   * Method to get command instance
   *
   * @param command string
   * @return ICommand
   */
  public getCommand = (command: string): ICommand => {
    if (command === 'extract') return new ExtractCommand();
    throw new Error(`Command "${command}" not found`);
  }

  /**
   * Method to get response of request
   *
   * @return IResponse
   */
  public getResponse = (): IResponse => {
    return new Response();
  }
}