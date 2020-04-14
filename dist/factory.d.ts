import express from 'express';
import { IFactory } from '.';
import { IController } from './interfaces';
export declare class Factory implements IFactory {
    /**
     * Method to create instance of controller
     *
     * @param name string
     * @param request express.Request
     * @param response express.Response
     * @throws Error Controller not found
     * @return IController
     */
    getController: (name: string, request?: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, response?: express.Response<any>) => IController;
    /**
     * Method to create instance of collection
     *
     * @param name string
     * @return any
     */
    getCollection: (name: string) => any;
}
