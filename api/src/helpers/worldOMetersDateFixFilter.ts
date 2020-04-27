import moment from 'moment';
import { IModelParseResultIntegration, Logger } from "..";
import { Helper } from "../helper";
import { IHelperWorldOMetersDateFixFilter } from "./interfaces";

export class HelperWorldOMetersDateFixFilter extends Helper implements IHelperWorldOMetersDateFixFilter {

  /**
   * Method to apply filter in data of World O Meters
   *
   * @param model IModelParseResultIntegration
   * @param input string
   * @return void
   */
  public apply = (model: IModelParseResultIntegration): void => {
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
    Logger.get().debug(`Date to parse`, { date });
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
    if (date[0] && date[1]) {
      const dateUTC = `${moment().format('YYYY')}-${this.getMonths(date[0])}-${date[1]}T00:00:00Z`;
      Logger.get().debug(`Get date has success!`, { date, dateUTC });
      return dateUTC;
    }
    Logger.get().error(`On try get date has error`, { date });
    throw new Error(`Error on try parse date`);
  }

  /**
   * Method to get month by alias
   *
   * @param month string
   * @throws Error if month not found in static list
   * @return string
   */
  private getMonths = (month: string): string => {
    const months = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    };
    if (months[month]) {
      Logger.get().debug(`Parse date has success!`, { month, match: months[month] });
      return months[month];
    }
    Logger.get().error(`On try parse date has error`, { month });
    throw new Error(`This month "${month}" not found`);
  }

}