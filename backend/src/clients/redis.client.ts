import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

const RedisPublisher = RedisClient.duplicate();
const RedisSubscriber = RedisClient.duplicate();

type HandlerKeys = 'client' | 'publisher' | 'subscriber' 

class RedisHandlerClass {
  private clients: Record<HandlerKeys, typeof RedisClient>;
  constructor() {
    this.clients = {
      client: RedisClient,
      publisher: RedisPublisher,
      subscriber: RedisSubscriber,
    };
  }
  
  get(type: HandlerKeys): typeof RedisClient {
    return this.clients[type]
  }

  async setup() {
    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys]
          .connect()
          .then((res: any) => console.log(`Connection Succesful to Redis ${name}`))
          .catch((err: any) => console.log(`Error in DB connection ${err}`))
      )
    );

    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys].on("error", function (error) {
          console.error(error);
        })
      )
    );
  }

  async teardown() {
    await Promise.all(
      Object.keys(this.clients).map((name) => this.clients[name as HandlerKeys].quit())
    );
  }
}
export default new RedisHandlerClass();
