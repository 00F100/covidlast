import { config as dotenv } from 'dotenv';
import { Logger } from '.';
import { Application } from './application';
import { IApplication, IHandlerInput } from './interfaces';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

exports.handler = (input: IHandlerInput, context: any, callback: any) => {
  // get application
  const app: IApplication = Application.get();

  if (app.handler(input)) {
    Logger.get().info('Handler has success!');
  } else {
    Logger.get().fatal('Handler has error!');
  }
};
