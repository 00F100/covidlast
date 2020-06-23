import { IApplication, IControllerCountriesTop5, IModelCase, IRoute } from '..';
import { IControllerCases } from './interfaces';

export class ControllerCountriesTop5 implements IControllerCountriesTop5 {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  public onCreate = (application: IApplication, context: IRoute) => {
    const collection = application.controller<IControllerCases>('cases').getCollection();
    const returnData = [];
    collection.getData<IModelCase>().map(model => {

      const {
        countryId,
        countryName,
        countryPopulation,
        countryColor,
        data
      } = model;

      returnData.push({
        countryId,
        countryName,
        countryPopulation,
        countryColor,
        cases: data[data.length - 1][1][0]
      });
    });
    returnData.sort((a, b) => {
      if (a.cases > b.cases){
        return -1;
      }
      if (a.cases < b.cases){
        return 1;
      }
      return 0;
    });
    returnData.splice(5, returnData.length);
    context.response = { ...application.view().json(collection), data: returnData};
    context.response.meta.total = returnData.length;
  };

}