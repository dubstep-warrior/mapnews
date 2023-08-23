// src/application.ts
import express, {
  Application as ExApplication,
  Handler,
  RequestHandler,
} from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { controllers } from "./controllers";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";

import multer from "multer";

class Application {
  private readonly _instance: ExApplication;
  get instance(): ExApplication {
    return this._instance;
  }
  upload: multer.Multer;
  imageUploadPaths: Record<string, (...args: any[]) => void>;
  constructor() {
    this._instance = express();

    const storage = multer.memoryStorage();
    this.upload = multer({ storage });

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
      res.header(`Access-Control-Allow-Origin`, `*`);
      res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
      res.header(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
      next();
    };
    this._instance.use(allowCrossDomain);

    this._instance.use(express.json());
    this._instance.use(express.urlencoded({ extended: true }));

    this._instance.use(bodyParser.urlencoded({ extended: false }));
    this._instance.use(bodyParser.json());

    this.imageUploadPaths = {
      apiCreateArticle: this.upload.array("images", 12),
      apiRegister: this.upload.single("profile_img"),
    };

    this.registerRouters();
  }

  private registerRouters() {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerClass() as any;
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass,
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass,
      );
      const exRouter = express.Router();
      console.log(routers);
      routers.forEach(({ method, path, handlerName }) => {
        if (handlerName in this.imageUploadPaths) {
          exRouter[method](
            path,
            this.imageUploadPaths[
              handlerName as keyof typeof this.imageUploadPaths
            ],
            controllerInstance[String(handlerName)].bind(controllerInstance),
          );
        } else {
          exRouter[method](
            path,
            controllerInstance[String(handlerName)].bind(controllerInstance),
          );
        }

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    console.table(info);
  }
}
export default new Application();
