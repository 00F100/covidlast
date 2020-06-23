import moment from 'moment';
import { IControllerStatus } from '.';
import { IApplication, IRoute } from '..';

export class ControllerStatus implements IControllerStatus {

  /**
   * Method to call on create route
   *
   * @return (application: IApplication, context: IRoute) => void
   */
  public onCreate = (application: IApplication, context: IRoute) => {
    context.response = application.view().html('status', {
      status: 'Application running!',
      date: moment().utc().format('MM/DD/YYYY HH:mm:ss')
    });
  }
}