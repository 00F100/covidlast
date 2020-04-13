import * as express from 'express';
import { IFactory, ModelCase } from '.';
import { CollectionCases, CollectionDatas } from './collections';
import { ControllerCases } from './controllers';
import { ICollection, IController } from './interfaces';
import { ModelData } from './models';
import * as sqlite3 from 'better-sqlite3';

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
  public getController = (name: string, request: express.Request, response: express.Response): IController => {
    if (name === 'cases') return new ControllerCases(this.getCollection('datas'), this.getCollection('cases'), request, response);
    throw new Error(`Controller "${name}" not found`);
  }

  /**
   * Method to create instance of collection
   *
   * @param name string
   * @return ICollection
   */
  public getCollection = (name: string): ICollection => {
    if (name === 'datas') return new CollectionDatas(
      sqlite3.
      () => { return new ModelData() }
    );
    if (name === 'cases') return new CollectionCases(
      () => { return new ModelCase() }
    );
    throw new Error(`Collection "${name}" not found`);
  }
}