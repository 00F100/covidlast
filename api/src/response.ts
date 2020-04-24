import { IResponse } from '.';

export class Response implements IResponse {

  /**
   * Method to construct instance of Response
   *
   * @param _output string
   * @return void
   */
  public constructor(
    private _output: string = 'terminal',
    private _breakline: string = "\n",
    private _status: number = 200
  ) {
  }

  /**
   * Method to send response of execution
   *
   * @param message string
   * @return IResponse
   */
  public send = (message: string): IResponse => {
    if (this._output === 'terminal') process.stdout.write(`${this.getStatus()}${message}${this._breakline}`);
    return this;
  }

  /**
   * Method to get status of execution
   *
   * @return string
   */
  private getStatus = (): string => {
    if (this._output === 'terminal') return `[${this._status || 400}] `;
    return '';
  }
}