import { handler } from '../handler';
import { config as dotenv } from 'dotenv';
import { Logger } from '..';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Logger.get().debug('Execute handler from console or visual studio code', process.argv);

if (!process.argv[2]) {
  Logger.get().fatal('Args required not fount', process.argv);
  throw new Error('Args required not fount');
}

handler({
  command: process.argv[2],
  country: {
    id: +process.argv[3] || null
  }
}, null, null);