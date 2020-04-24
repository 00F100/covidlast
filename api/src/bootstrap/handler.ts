import { config as dotenv } from 'dotenv';
import { handler, Logger } from '..';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Logger.get().debug('Execute handler from console or visual studio code', process.argv);

// if not have command, exception...
if (!process.argv[2]) {
  Logger.get().fatal('Args required not fount', process.argv);
  throw new Error('Args required not fount');
}

// execute handler on params
handler({
  command: process.argv[2],
  country: {
    id: +process.argv[3] || null
  }
}, null, null);