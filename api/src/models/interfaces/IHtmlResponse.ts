import { IModel } from '../../interfaces';
import { IncomingHttpHeaders } from 'http';

export interface IModelHtmlResponse extends IModel {

  /**
   * HTML response of request
   * @param string
   */
  html: string;

  /**
   * Headers response of request
   * @param IncomingHttpHeaders
   */
  headers: IncomingHttpHeaders;

  /**
   * Status code of response
   * @param number
   */
  statusCode: number;
}