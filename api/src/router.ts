import express from 'express';
import moment from 'moment';
import { IApplication, IRoute, IRouteMethods, IRouter } from '.';
import { IModelCase } from './models';

export class Router implements IRouter {

  /**
   * Method to mount enable routes
   *
   * @param application IApplication
   * @return IRoute[]
   */
  public mount = (application: IApplication): IRoute[] => {

    return [
      {
        method: IRouteMethods.GET,
        path: '/status',
        onCreate: context => {
          context.response = application.view().html('status', {
            status: 'Application running!',
            date: moment().utc().format('MM/DD/YYYY HH:mm:ss')
          });
        }
      },
      {
        method: IRouteMethods.GET,
        path: '/countries',
        onCreate: (context: IRoute) => {
          const collection = application.controller('cases');
          const returnData = [];
          collection.getData<IModelCase>().map(model => {

            const {
              countryId,
              countryName,
              countryPopulation,
              data
            } = model;

            returnData.push({
              countryId,
              countryName,
              countryPopulation,
              cases: data[data.length-1].cases
            });
          });
          returnData.sort(function(a, b) {
            if ( a.countryName < b.countryName ){
              return -1;
            }
            if ( a.countryName > b.countryName ){
              return 1;
            }
            return 0;
          });
          context.response = { ... application.view().json(collection), data: returnData};
          context.response.meta.total = returnData.length;
        }
      },
      {
        method: IRouteMethods.GET,
        path: '/cases',
        onCreate: (context: IRoute) => {
          context.cache = application.controller('cases');
        },
        onExecute: (context: IRoute, request: express.Request) => {
          const returnData = [];
          const input: number[] | any = request.query.country;
          if (request.query.country && request.query.country.length > 0) {
            context.cache.getData().map(model => {
              if (input.indexOf(model.countryId.toString()) > -1) {
                returnData.push(model);
              }
            });
            context.response = { ... application.view().json(context.cache), data: returnData};
            context.response.meta.total = returnData.length;
          }
        }
      }
    ];
  }
}