import { IHelperWorldOMeters, Logger } from '..';
import { Helper } from '../helper';

export class HelperWorldOMeters extends Helper implements IHelperWorldOMeters {
  

  /**
   * Method to match data on HTML result
   *
   * @param input string
   * @return string
   */
  protected matchBlockChart = (input: string, filter: string): string => {
    const regex = new RegExp(`${filter}[\\'\\",\\s{a-zA-Z0-9\\(\\)\\[\\]:#}]+;`, 'g');
    // eg: /coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g

    Logger.get().debug('HTML input to filter', { filter, input, regex });
    try {
      return input.match(regex).find(Boolean);
    } catch(err) {
      Logger.get().error('Error on try match regex HTML', { filter, input, regex, err });
      throw err;
    }
  }

  /**
   * Method to clean string extracted
   *
   * @param input string
   * @param filter: string
   * @return string
   */
  protected clean = (input: string, filter: string): string => {
    Logger.get().debug('HTML input to clean', input);
    return input.replace(`${filter}\', `, '').slice(0, -2);
  }

  /**
   * Method to fix JSON extracted
   *
   * @param input string
   * @return string
   */
  protected fixJson = (input: string): string => {
    Logger.get().debug('HTML input to fixJSON', input);
    return input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
  }

  /**
   * Method to get object from string
   *
   * @param input string
   * @param filter string
   * @return any
   */
  protected getObject = (input: string, filter: string): any => {
    const json = this.fixJson(this.clean(this.matchBlockChart(input, filter), filter));
    Logger.get().debug('HTML input before object', json);
    const obj = JSON.parse(json);
    Logger.get().debug('HTML input after object', obj);
    return obj;
  }
}