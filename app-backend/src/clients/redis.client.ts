import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

RedisClient.connect()
  .then((res: any) => console.log(`Connection Succesful to RedisClient`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

export default RedisClient;

export const RedisPublisher = RedisClient.duplicate();
export const RedisSubscriber = RedisClient.duplicate();

RedisPublisher.connect()
  .then((res: any) => console.log(`Connection Succesful to RedisPublisher`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

RedisSubscriber.connect()
  .then((res: any) => console.log(`Connection Succesful to RedisSubscriber`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

RedisClient.on("error", function (error) {
  console.error(error);
});
RedisSubscriber.on("error", function (error) {
  console.error(error);
});
RedisPublisher.on("error", function (error) {
  console.error(error);
});
