"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor() {
        /**
         * Method to get data of collection
         *
         * @return T[] | any[]
         */
        this.getData = () => {
            return this._data;
        };
        /**
         * Method to get JSON of data collection
         *
         * @return string
         */
        this.toJSON = () => {
            return JSON.stringify(this._data);
        };
    }
}
exports.Collection = Collection;
