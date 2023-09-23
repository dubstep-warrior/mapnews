import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

export const RedisPublisher = RedisClient.duplicate();
export const RedisSubscriber = RedisClient.duplicate();

class RedisHandlerClass {
  clients: Record<string, typeof RedisClient>;
  constructor() {
    this.clients = {
      RedisClient: RedisClient,
      RedisPublisher: RedisPublisher,
      RedisSubscriber: RedisSubscriber,
    };
  }

  async setup() {
    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name]
          .connect()
          .then((res: any) => console.log(`Connection Succesful to ${name}`))
          .catch((err: any) => console.log(`Error in DB connection ${err}`)),
      ),
    );

    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name].on("error", function (error) {
          console.error(error);
        }),
      ),
    );
  }

  async teardown() {
    await Promise.all(
      Object.keys(this.clients).map((name) => this.clients[name].quit()),
    );
  }
}
export const RedisHandler = new RedisHandlerClass();

export default RedisClient;
