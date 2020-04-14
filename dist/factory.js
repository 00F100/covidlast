"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const collections_1 = require("./collections");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const { DATASOURCE_lOCATION } = process.env;
class Factory {
    constructor() {
        /**
         * Method to create instance of controller
         *
         * @param name string
         * @param request express.Request
         * @param response express.Response
         * @throws Error Controller not found
         * @return IController
         */
        this.getController = (name, request, response) => {
            if (name === 'cases')
                return new controllers_1.ControllerCases(this.getCollection('datas'), this.getCollection('cases'), request, response);
            throw new Error(`Controller "${name}" not found`);
        };
        /**
         * Method to create instance of collection
         *
         * @param name string
         * @return any
         */
        this.getCollection = (name) => {
            if (name === 'datas')
                return new collections_1.CollectionDatas(better_sqlite3_1.default(DATASOURCE_lOCATION || ':memory:'), () => { return new models_1.ModelData(); });
            if (name === 'cases')
                return new collections_1.CollectionCases(better_sqlite3_1.default(DATASOURCE_lOCATION || ':memory:'), () => { return new _1.ModelCase(); });
            throw new Error(`Collection "${name}" not found`);
        };
    }
}
exports.Factory = Factory;
