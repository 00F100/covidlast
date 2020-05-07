export interface IErrorLogReason {
  /**
   * Rule used in validation
   * @param string
   */
  validator: string;

  /**
   * Property used in validation
   * @param string
   */
  property: string;

  /**
   * Value used in validation
   * @param string
   */
  value: string;
}