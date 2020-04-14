import { ICollection } from '../../interfaces';
export interface ICollectionsDatas extends ICollection {
    /**
     * Method to get data
     *
     * @return ICollectionsDatas
     */
    getOrderByDate(): ICollectionsDatas;
}
