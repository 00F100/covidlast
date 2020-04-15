import { IApplication, IRoute } from '.';

export interface IRouter {
  mount(application: IApplication): IRoute[];
}