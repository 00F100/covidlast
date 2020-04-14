"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../collection");
class CollectionDatas extends collection_1.Collection {
    /**
     * Method to construct instance of CollectionDatas
     *
     * @param _databaseSQLite3 sqlite3.Database
     * @param _factoryModelData () => IModelData
     * @return void
     */
    constructor(_databaseSQLite3, _factoryModelData) {
        super();
        this._databaseSQLite3 = _databaseSQLite3;
        this._factoryModelData = _factoryModelData;
        /**
         * Data of colllection
         * @param IModelData[]
         */
        this._data = [];
        /**
         * Method to get data of cases with order by date ASC
         *
         * @return ICollectionsDatas
         */
        this.getOrderByDate = () => {
            const rows = this._databaseSQLite3.prepare(`
      SELECT
        d.id, d.cases, d.deaths, d.timestamp, c.name,
        strftime('%m-%d-%Y', datetime(d.timestamp, 'unixepoch')) AS date
      FROM data AS d
      INNER JOIN countries AS c ON d.idCountry = c.id
      ORDER BY d.timestamp ASC, c.name ASC`).all();
            rows.map(row => {
                const model = this._factoryModelData();
                model.load(row);
                this._data.push(row);
            });
            return this;
        };
    }
}
exports.CollectionDatas = CollectionDatas;
