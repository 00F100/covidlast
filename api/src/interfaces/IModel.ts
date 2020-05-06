import { IModelAnalyze } from '.';

export interface IModel {

  /**
   * Required fields in model
   * @param IModelAnalyze
   */
  required?: IModelAnalyze,

  /**
   * Conditional fields in model
   * @param IModelAnalyze
   */
  conditionals?: IModelAnalyze,

  /**
   * Method to load any data into Model
   *
   * @param context T
   * @param data T
   * @return void
   */
  load?<T>(data: T): void;

  /**
   * Method to validate model
   *
   * @throws Validate fail
   * @return boolean
   */
  validate?(): boolean;
}