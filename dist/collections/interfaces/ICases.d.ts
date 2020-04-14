import { ICollectionsDatas } from '.';
import { ICollection } from '../../interfaces';
export interface ICollectionsCases extends ICollection {
    /***
     * Method to get cases dy data
     *
     * @param collectionDatas ICollectionsDatas
     * @return ICollectionsCases
     */
    getByCountry(collectionDatas: ICollectionsDatas): ICollectionsCases;
}
