import { IControllerCountries } from '.';
import { IApplication, IRoute, IModelCase } from '..';
import { Router } from 'express';
import { IControllerCases } from './interfaces';

export class ControllerCountries implements IControllerCountries {

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
        cases: data[data.length - 1].cases
      });
    });
    returnData.sort((a, b) => {
      if (a.countryName < b.countryName){
        return -1;
      }
      if (a.countryName > b.countryName){
        return 1;
      }
      return 0;
    });
    context.response = { ...application.view().json(collection), data: returnData};
    context.response.meta.total = returnData.length;
  };

}