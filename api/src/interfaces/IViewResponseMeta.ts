export interface IViewResponseMeta {

  /**
   * Total of records
   * @param number
   */
  total: number;

  /**
   * Current page
   * @param number
   */
  page: number;

  /**
   * Number of pages
   * @param number
   */
  pages: number;

  /**
   * Timestamp of current date
   * @param number
   */
  date: number;
}