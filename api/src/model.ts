import { validate } from 'validate-typescript';
import { IErrorLogReason, IModel } from '.';
import { Logger } from './logger';

export class Model implements IModel {

  /**
   * Cache of data on load
   * @param object
   */
  public _cacheData: any = null;

  /**
   * Method to load data into model in "this" context
   *
   * @param data T
   * @return void
   */
  public load = <T> (data: T): void => {
    this._cacheData = { ...data };
    this.populate<T>(this, data);
  }

  /**
   * Method to get object from model
   *
   * @return Object
   */
  public toObject = (): object => {
    return this._cacheData;
  }

  /**
   * Method to validate model
   *
   * @return boolean
   */
  public validate = (): boolean => {
    return this.analyze(this);
  }

  /**
   * Method to clean model to JSON
   *
   * @param data IModel
   * @return void
   */
  public cleanToJson = (model: IModel): void => {
    if (model._cacheData !== undefined) model._cacheData = undefined;
  }

  /**
   * Method to populate model from data
   *
   * @param context any
   * @param data T
   * @return void
   */
  private populate = <T> (context: any, data: T): void => {
    for (const i in data) {
      if (context[i] !== undefined) {
        context[i] = data[i];
      }
    }
  }

  /**
   * Method to analyze model and return boolean or exception
   *
   * @param context IModel
   * @return boolean
   */
  private analyze = (context: IModel): boolean => {
    this.analyzeRequired(context);
    return this.analyzeConditionals(context);
  }

  /**
   * Method to analyze required fields
   *
   * @param context IModel
   * @throws Error on validate
   * @return void
   */
  private analyzeRequired = (context: IModel): void => {
    if (context.required) {
      this.processValidate(context.required, context, (err) => {
        Logger.get().fatal('Error on validate required fields', this.getErrorLogReason(err));
        throw err;
      });
    }
  }

  /**
   * Method to analyze conditional fields
   *
   * @param context IModel
   * @return boolean
   */
  private analyzeConditionals = (context: IModel): boolean => {
    if (context.conditionals) {
      return this.processValidate(context.conditionals, context, (err) => {
        Logger.get().error('Error on validate conditional fields', this.getErrorLogReason(err));
        return false;
      });
    }
    return true;
  }

  /**
   * Method to process validation of model
   *
   * @param schema IModelAnalyze
   * @param context Imodel
   * @param callbackError (err: any) => boolean
   * @return boolean
   */
  private processValidate = (schema: any, context: IModel, callbackError: (err: any) => boolean): boolean => {
    try {
      validate(schema, { ...context });
      return true;
    } catch (err) {
      return callbackError(err);
    }
  }

  /**
   * Method to get error log reason from exception
   *
   * @param err Error
   * @return IErrorLogReason[]
   */
  private getErrorLogReason = (err): IErrorLogReason[] => {
    const errLog: IErrorLogReason[] = [];
    err.child_errors.map(e => {
      errLog.push({
        validator: e.validator,
        property: e.property,
        value: e.value
      });
    });
    return errLog;
  }
}