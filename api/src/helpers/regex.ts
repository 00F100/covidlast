import { Helper } from '../helper';
import { IHelperRegex } from '.';

export class HelperRegex extends Helper implements IHelperRegex {
  public process = <T> (input: string, output: () => T): T => {

    const json = this.fixJson(this.clean(this.matchBlockChart(input)))
    const obj = JSON.parse(json);

    const model = output();
    return model;
  }

  private matchBlockChart = (input: string): string => {
    return input.match(/coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g).find(Boolean);
  }

  private clean = (input: string): string => {
    return input.replace('coronavirus-cases-linear\', ', '').slice(0, -2);
  }

  private fixJson = (input: string) => {
    return input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
  }
}