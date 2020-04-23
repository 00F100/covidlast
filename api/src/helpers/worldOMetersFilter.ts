import { IHelperWorldOMetersFilter, IModelRegexResponse, Logger } from '..';
import { Helper } from '../helper';
import moment from 'moment';

export class HelperWorldOMetersFilter extends Helper implements IHelperWorldOMetersFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelRegexResponse
   * @param input string
   * @return void
   */
  public apply = (model: IModelRegexResponse, input: string): void => {
    const obj = this.getObject(
      this.fixJson(
        this.clean(
          this.matchBlockChart(input)
        )
      )
    );
    model.load({ days: obj.xAxis.categories, data: obj.series.find(Boolean).data});
    this.fixDate(model);
  }

  /**
   * Method to fix date extracted
   *
   * @param model IModelRegexResponse
   * @return void
   */
  private fixDate = (model: IModelRegexResponse): void => {
    Logger.get().debug('Model before fix date', model);
    if (model.days.length > 0) {
      model.days.map((day, index) => {
        model.days[index] = this.getTimestampFromMonthAlias(day);
      });
    }
    Logger.get().debug('Model after fix date', model);
  }

  /**
   * Method to transform alias month to date
   *
   * @param alias string
   * @return string
   */
  private getTimestampFromMonthAlias = (alias: string): string => {
    const date = alias.split(' ');
    const momentDate = moment(this.getDate(date), 'YYYY-MM-DDTHH:ii:ssZ');
    return momentDate.utc().format('X');
  }

  /**
   * Method to get date in moment from string
   *
   * @param date string[]
   * @return string
   */
  private getDate = (date: string[]): string => {
    return `${moment().format('YYYY')}-${this.getMonths(date[0])}-${date[1]}T00:00:00Z`;
  }

  /**
   * Method to get month by alias
   *
   * @param month string
   * @return string
   */
  private getMonths = (month: string): string => {
    const months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
    return months[month];
  }

  /**
   * Method to match data on HTML result
   *
   * @param input string
   * @return string
   */
  private matchBlockChart = (input: string): string => {
    Logger.get().debug('HTML input to filter', input);
    return input.match(/coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g).find(Boolean);
  }

  /**
   * Method to clean string extracted
   *
   * @param input string
   * @return string
   */
  private clean = (input: string): string => {
    Logger.get().debug('HTML input to clean', input);
    return input.replace('coronavirus-cases-linear\', ', '').slice(0, -2);
  }

  /**
   * Method to fix JSON extracted
   *
   * @param input string
   * @return string
   */
  private fixJson = (input: string): string => {
    Logger.get().debug('HTML input to fixJSON', input);
    return input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
  }

  /**
   * Method to get object from string
   *
   * @param json
   * @return any
   */
  private getObject = (json: string): any => {
    Logger.get().debug('HTML input before object', json);
    const obj = JSON.parse(json);
    Logger.get().debug('HTML input after object', obj);
    return obj;
  }
}