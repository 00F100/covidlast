import { IController, ICollection } from './interfaces';
export declare class Controller implements IController {
    /**
     * Method default to execute on call controller
     *
     * @return ICollection
     */
    execute: () => ICollection;
}
