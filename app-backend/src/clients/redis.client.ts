import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

export const RedisPublisher = RedisClient.duplicate();
export const RedisSubscriber = RedisClient.duplicate();

const clients: Record<string, typeof RedisClient> = {
  RedisClient: RedisClient,
  RedisPublisher: RedisPublisher,
  RedisSubscriber: RedisSubscriber,
};

Object.keys(clients).forEach((name) => {
  clients[name]
    .connect()
    .then((res: any) => console.log(`Connection Succesful to ${name}`))
    .catch((err: any) => console.log(`Error in DB connection ${err}`));

  clients[name].on("error", function (error) {
    console.error(error);
  });
});

export default RedisClient;
