import { config as dotenv } from 'dotenv';
import { Application, IApplication, IHandlerInput, Logger } from '.';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

/**
 * Function to execute handler from lambda execution
 *
 * @param input IHandlerInput
 * @param context any
 * @param callback any
 * @return void
 */
export const handler = (input: IHandlerInput, context: any, callback: any): void => {

  Logger.get().debug('Execute handler', process.argv);

  // get application
  const app: IApplication = Application.get();

  // execute handler
  if (app.handler(input)) {
    Logger.get().info('Handler has success!');
  } else {
    Logger.get().fatal('Handler has error!');
  }
};
