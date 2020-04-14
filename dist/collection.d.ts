import { ICollection } from './interfaces';
export declare class Collection implements ICollection {
    /**
     * Data of collection
     * @param any[]
     */
    protected _data: any[];
    /**
     * Method to get data of collection
     *
     * @return T[] | any[]
     */
    getData: <T>() => any[] | T[];
    /**
     * Method to get JSON of data collection
     *
     * @return string
     */
    toJSON: () => string;
}
