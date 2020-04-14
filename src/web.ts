import { config as dotenv } from 'dotenv';
import { Logger } from '.';
import { Application } from './application';
import { IApplication } from './interfaces';

dotenv();

const {
  WEBSERVER_PORT
} = process.env;

// get application
const app: IApplication = Application.get();

// start and listen on port ...
if (app.listen(WEBSERVER_PORT || '')) {
  Logger.get().info('Web server success!');
} else {
  Logger.get().fatal('Web server error!');
}
