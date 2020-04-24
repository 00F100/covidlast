import { IncomingHttpHeaders } from 'http';
import { IModelHtmlResponse } from '..';
import { Model } from '../model';

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