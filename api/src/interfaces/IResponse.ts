export interface IResponse {

  /**
   * Method to send response of execution
   *
   * @param message string
   * @return IResponse
   */
  send(message: string): IResponse;
}