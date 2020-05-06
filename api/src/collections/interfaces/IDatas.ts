import { ICollection, IModelCountry, IModelParseResultIntegration } from '../..';

export interface ICollectionsDatas extends ICollection {

  /**
   * Method to get data
   *
   * @return ICollectionsDatas
   */
  getOrderByDate(): ICollectionsDatas;

  /**
   * Method to create datas by regex response
   *
   * @param modelCountry IModelCountry
   * @param modelWorldOMeters IModelRegexResponse
   * @return ICollectionsDatas
   */
  createCaseFromIntegration(modelCountry: IModelCountry, modelWorldOMeters: IModelParseResultIntegration): ICollectionsDatas;
}

/**
 * Interface of integration response
 */
export interface ICollectionIntegrationResult {
  total: number;
  success: number;
  error: number;
  ignore: number;
  duplicate: number;
}