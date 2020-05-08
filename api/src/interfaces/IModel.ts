import { IModelValidation } from '.';

export interface IModel {

  /**
   * Cache of data on load
   * @param object
   */
  _cacheData?: any;

  /**
   * Required fields in model
   * @param IModelAnalyze
   */
  required?: any,

  /**
   * Conditional fields in model
   * @param IModelAnalyze
   */
  conditionals?: any,

  /**
   * Method to load any data into Model
   *
   * @param context T
   * @param data T
   * @return void
   */
  load?<T>(data: T): void;

  /**
   * Method to get object from model
   *
   * @return Object
   */
  toObject?(): object;

  /**
   * Method to validate model
   *
   * @throws Validate fail
   * @return boolean
   */
  validate?(): boolean;
}