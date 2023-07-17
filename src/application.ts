// src/application.ts
import express, { Application as ExApplication, NextFunction } from "express";
import bodyParser from "body-parser";
import articles from "./routes/article.routes"
import auth from "./routes/auth.routes"
import config from "./routes/config.routes"
import cors from 'cors'

class Application {
  private readonly _instance: ExApplication;
  get instance(): ExApplication {
    return this._instance;
  }
  constructor() {
    this._instance = express();

    // IMPORTANT: CORS settings before express json
    // const whitelist = ["*"];
    // const corsOptions = {
    //   origin: function (origin: any, callback: any) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error("Not allowed by CORS"));
    //     }
    //   },
    // };

    // this._instance.use(cors(corsOptions));

    const allowCrossDomain = (req: any, res: any, next: any) => {
      res.header(`Access-Control-Allow-Origin`, `http://localhost:4200`);
      res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
      res.header(`Access-Control-Allow-Headers`, `Content-Type`);
      next();
    };
    this._instance.use(allowCrossDomain);

    this._instance.use(express.json());
    this._instance.use(express.urlencoded({ extended: true }));

    this._instance.use(bodyParser.urlencoded({ extended: false }));
    this._instance.use(bodyParser.json());

    this.registerRouters();   
    
  }
  private registerRouters() {
    this._instance.use("/api/v1/config", config);
    this._instance.use("/api/v1/articles", articles);
    this._instance.use("/api/v1/auth", auth);

     
  }
}
export default new Application();
