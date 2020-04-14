"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
class ModelData extends model_1.Model {
    constructor() {
        super(...arguments);
        /**
         * ID of data
         * @param number
         */
        this.id = 0;
        /**
         * Number of cases
         * @param number
         */
        this.cases = 0;
        /**
         * Number of deaths
         * @param number
         */
        this.deaths = 0;
        /**
         * Timestamp captured data
         * @param number
         */
        this.timestamp = 0;
        /**
         * Date captured data
         * @param string
         */
        this.date = '';
        /**
         * Name of country
         * @param string
         */
        this.name = '';
    }
}
exports.ModelData = ModelData;
