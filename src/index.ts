import "reflect-metadata";
import {createConnection} from "typeorm";
import {AppRoutes} from "./routes";
import {Request, Response} from "express";
import express from "express";
import * as bodyParser from "body-parser";
import { Title } from "./entity/Title";

createConnection({
    name: "db",
    type: "sqlite",
    database: "database.sqlite",
    entities: [
        Title
    ],
    synchronize: true,
}).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3000);

    console.log("Express listening on port 3000");

}).catch(e => console.log("TypeORM can't connect", e));
