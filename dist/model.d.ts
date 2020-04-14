import { IModel } from './interfaces';
export declare class Model implements IModel {
    /**
     * Method to load data into model
     *
     * @param data object | string[]
     * @return void
     */
    load: (data: object | string[]) => void;
}
