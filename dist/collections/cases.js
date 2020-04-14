"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../collection");
class CollectionCases extends collection_1.Collection {
    /**
     * Method to construct instance of Collection Cases
     *
     * @param _databaseSQLite3 sqlite3.Database
     * @param _factoryModelCase () => IModelCase
     * @return void
     */
    constructor(_databaseSQLite3, _factoryModelCase) {
        super();
        this._databaseSQLite3 = _databaseSQLite3;
        this._factoryModelCase = _factoryModelCase;
        /**
         * Data of collection
         * @param IModelCase[]
         */
        this._data = [];
        /**
         * Method to get cases from data
         *
         * @param collectionDatas ICollectionsDatas
         * @return ICollectionsCases
         */
        this.getByCountry = (collectionDatas) => {
            const datas = collectionDatas.getData();
            datas.map((data) => {
                let model = this._data.find(x => x.name === data.name);
                if (!model) {
                    model = this._factoryModelCase();
                    model.name = data.name;
                    this._data.push(model);
                }
                model.data.push(data.cases);
            });
            return this;
        };
    }
}
exports.CollectionCases = CollectionCases;
