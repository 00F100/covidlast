import { IViewResponseMeta } from '.';

export interface IViewResponse {

  /**
   * Data of response
   * @param object
   */
  data: object;

  /**
   * Meta of response
   * @param IViewResponse
   */
  meta: IViewResponseMeta;
}