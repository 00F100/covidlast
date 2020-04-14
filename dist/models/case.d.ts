import { Model } from '../model';
import { IModelCase } from './interfaces';
export declare class ModelCase extends Model implements IModelCase {
    /**
     * Name of country
     * @param string
     */
    name: string;
    /**
     * Data of cases by time
     * @param number[]
     */
    data: number[];
}
