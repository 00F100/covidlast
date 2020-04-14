"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
class ModelCase extends model_1.Model {
    constructor() {
        super(...arguments);
        /**
         * Name of country
         * @param string
         */
        this.name = '';
        /**
         * Data of cases by time
         * @param number[]
         */
        this.data = [];
    }
}
exports.ModelCase = ModelCase;
