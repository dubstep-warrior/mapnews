import * as dotenv from "dotenv";
dotenv.config();
import { getSecret } from "./clients/secret_manager.client";

import mongoose, { ConnectOptions } from "mongoose";
import application from "./application";
import * as http from "http";
import "reflect-metadata";
import websockets from "./websockets/index";
import RedisHandler from "./clients/redis.client";
import { ImageKitHandler } from "./clients/imagekit.client";
const port = process.env.PORT || 8000;

getSecret().then(() => {
  mongoose
    .connect(process.env.MONGODB_CLUSTER_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((res: any) => console.log(`Connection Succesful to MongoDB`))
    .catch((err: any) => console.log(`Error in DB connection ${err}`));

  RedisHandler.setup();
  ImageKitHandler.setup();
});

const server = http.createServer(application.instance);

server.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});

websockets(server);

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close();
});
