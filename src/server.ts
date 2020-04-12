import { config as dotenv } from 'dotenv';

dotenv();

const {
  WEBSERVER_PORT
} = process.env;

const server: IServer = Server.get();
if (server.listen(WEBSERVER_PORT)) {
  console.log('web server success!');
} else {
  console.log('web server fail!');
}
