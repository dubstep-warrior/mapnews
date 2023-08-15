import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

/* create and open the Redis OM Client */
const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

// RedisClient.on("error", (err) => console.log("Redis Client Error", err));
RedisClient.connect()
  .then((res: any) => console.log(`Connection Succesful ${res}`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

export default RedisClient;

export const RedisPublisher = RedisClient.duplicate();
export const RedisSubscriber = RedisClient.duplicate();

RedisPublisher.connect()
  .then((res: any) => console.log(`Connection Succesful ${res}`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));

RedisSubscriber.connect()
  .then((res: any) => console.log(`Connection Succesful ${res}`))
  .catch((err: any) => console.log(`Error in DB connection ${err}`));
