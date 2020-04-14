"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor() {
        /**
         * Method to load data into model
         *
         * @param data object | string[]
         * @return void
         */
        this.load = (data) => {
            for (const i in data) {
                if (this[i] !== undefined) {
                    this[i] = data[i];
                }
            }
        };
    }
}
exports.Model = Model;
