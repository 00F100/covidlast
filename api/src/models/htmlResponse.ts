import { Model } from '../model';
import { IModelHtmlResponse } from './interfaces';
import { IncomingHttpHeaders } from 'http';

export class ModelHtmlResponse extends Model implements IModelHtmlResponse {

  /**
   * HTML response of request
   * @param string
   */
  public html: string = '';

  /**
   * Headers response of request
   * @param IncomingHttpHeaders
   */
  public headers: IncomingHttpHeaders = {};

  /**
   * Status code of response
   * @param number
   */
  public statusCode: number = 400;
}