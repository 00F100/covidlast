"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
class ControllerCases extends controller_1.Controller {
    /**
     * Method to construct instance of Controller Cases
     *
     * @param _collectionDatas ICollectionsDatas
     * @param _collectionCases ICollectionsCases
     * @param _request express.Request
     * @param _response express.Response
     */
    constructor(_collectionDatas, _collectionCases, _request, _response) {
        super();
        this._collectionDatas = _collectionDatas;
        this._collectionCases = _collectionCases;
        this._request = _request;
        this._response = _response;
        /**
         * Method to execute on call this controller
         *
         * @return ICollectionsCases
         */
        this.execute = () => {
            return this._collectionCases.getByCountry(this._collectionDatas.getOrderByDate());
        };
    }
}
exports.ControllerCases = ControllerCases;
