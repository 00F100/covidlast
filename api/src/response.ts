import { IResponse } from './interfaces';

export class Response implements IResponse {
  public send = (message: string): void => {
    process.stdout.write(message);
  }
}