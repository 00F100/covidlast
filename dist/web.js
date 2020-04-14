"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const application_1 = require("./application");
dotenv_1.config();
const { WEBSERVER_PORT } = process.env;
// get application
const app = application_1.Application.get();
// start and listen on port ...
if (app.listen(WEBSERVER_PORT || '')) {
    console.log('web server success!');
}
else {
    console.log('web server fail!');
}
