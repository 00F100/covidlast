import log4js from 'log4js';
import { ILogger } from '.';

export class Logger implements ILogger {

  /**
   * Instance of log4js
   * @param log4js.Logger
   */
  private static _log: log4js.Logger;

  /**
   * Method to get singleton instance of log
   *
   * @return Logger
   */
  public static get = (): log4js.Logger => {
    if (!Logger._log) {

      const {
        LOGGER_LEVEL
      } = process.env;

      log4js.configure({
        appenders: { console: { type: 'console' } },
        categories: { default: { appenders: [ 'console' ], level: LOGGER_LEVEL } }
      });
      Logger._log = log4js.getLogger();
    }
    return Logger._log;
  }
}