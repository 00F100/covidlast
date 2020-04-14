import { IModel } from '../../interfaces';
export interface IModelData extends IModel {
    /**
     * ID of data
     * @param number
     */
    id: number;
    /**
     * Number of cases
     * @param number
     */
    cases: number;
    /**
     * Number of deaths
     * @param number
     */
    deaths: number;
    /**
     * Timestamp captured data
     * @param number
     */
    timestamp: number;
    /**
     * Date captured data
     * @param string
     */
    date: string;
    /**
     * Name of country
     * @param string
     */
    name: string;
}
