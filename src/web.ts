import { config as dotenv } from 'dotenv';
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
  console.log('web server success!');
} else {
  console.log('web server fail!');
}
