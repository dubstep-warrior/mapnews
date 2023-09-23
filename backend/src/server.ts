import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";
import application from "./application";
import * as http from "http";
import "reflect-metadata";
import websockets from "./websockets/index";
import RedisHandler from "./clients/redis.client";
const port = process.env.PORT || 8000; 
mongoose
  .connect(process.env.MONGODB_CLUSTER_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res: any) => console.log(`Connection Succesful to MongoDB`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

RedisHandler.setup();

const server = http.createServer(application.instance);

server.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});

websockets(server);
