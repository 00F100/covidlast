import { IApplication, IFactory } from '.';
export declare class Application implements IApplication {
    private _factory;
    /**
     * Instance of Application
     * @param IApplication
     */
    private static instance;
    /**
     * Method to get instance singleton of Application
     *
     * @return IApplication
     */
    static get: () => IApplication;
    /**
     * Method to construct instance of Application
     *
     * @param _factory IFactory
     * @return void
     */
    constructor(_factory: IFactory);
    /**
     * Method to listen port of Application
     *
     * @param port string | number
     * @return boolean
     */
    listen: (port?: string | number) => boolean;
    /**
     * Method to get port of web server
     *
     * @param port string | number
     * @return number
     */
    private port;
    /**
     * Method to mount routes and call controllers
     *
     * @param dispach express.Router
     * @return void
     */
    private routes;
    /**
     * Method to get controller instance
     *
     * @param name string
     * @param request express.Request
     * @param response express.Response
     * @return ICollection
     */
    private controller;
    /**
     * Method to get view page
     *
     * @param page string
     * @throws Error
     * @return string
     */
    private view;
    /**
     * Method to apply parameters into view
     *
     * @param data string
     * @param params any
     * @return string
     */
    private applyParams;
}
