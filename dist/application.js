"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const factory_1 = require("./factory");
class Application {
    /**
     * Method to construct instance of Application
     *
     * @param _factory IFactory
     * @return void
     */
    constructor(_factory) {
        this._factory = _factory;
        /**
         * Method to listen port of Application
         *
         * @param port string | number
         * @return boolean
         */
        this.listen = (port) => {
            const dispach = express_1.default();
            this.routes(dispach);
            dispach.listen(this.port(port), () => console.log(`Application UP on port "${port}"`));
            return true;
        };
        /**
         * Method to get port of web server
         *
         * @param port string | number
         * @return number
         */
        this.port = (port) => {
            if (!port) {
                port = 3000;
            }
            return +port;
        };
        /**
         * Method to mount routes and call controllers
         *
         * @param dispach express.Router
         * @return void
         */
        this.routes = (dispach) => {
            // mount home view before start server
            const home = this.view('home', {
                cases: this.controller('cases').toJSON()
            });
            // show home cache on execute request
            dispach.get('/', (request, response) => {
                response.send(home);
            });
        };
        /**
         * Method to get controller instance
         *
         * @param name string
         * @param request express.Request
         * @param response express.Response
         * @return ICollection
         */
        this.controller = (name, request, response) => {
            return this._factory.getController(name, request, response).execute();
        };
        /**
         * Method to get view page
         *
         * @param page string
         * @throws Error
         * @return string
         */
        this.view = (page, params) => {
            const file = `${__dirname}/view/${page}.html`;
            if (fs.existsSync(file)) {
                let data = fs.readFileSync(file).toString();
                data = this.applyParams(data, params);
                return data;
            }
            throw new Error(`View "${file}" not found`);
        };
        /**
         * Method to apply parameters into view
         *
         * @param data string
         * @param params any
         * @return string
         */
        this.applyParams = (data, params) => {
            for (const i in params) {
                if (typeof params[i] === 'string') {
                    data = data.replace(`\$\[${i}\]`, params[i]);
                }
            }
            return data;
        };
    }
}
exports.Application = Application;
/**
 * Method to get instance singleton of Application
 *
 * @return IApplication
 */
Application.get = () => {
    if (!Application.instance) {
        Application.instance = new Application(new factory_1.Factory());
    }
    return Application.instance;
};
