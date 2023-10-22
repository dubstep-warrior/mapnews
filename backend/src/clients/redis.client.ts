import { RedisClientType, createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();



type HandlerKeys = "client" | "publisher" | "subscriber";

class RedisHandlerClass {
  private clients: Record<HandlerKeys, RedisClientType | null> = {
    client: null,
    publisher: null,
    subscriber: null,
  };
  constructor() {
  }

  get(type: HandlerKeys) {
    return this.clients[type] as RedisClientType;
  }

  async setup() {
    const RedisClient = createClient({
      url: process.env.REDIS_URL,
    });

    const RedisPublisher = RedisClient.duplicate();
    const RedisSubscriber = RedisClient.duplicate();

    this.clients = {
      client: RedisClient as RedisClientType,
      publisher: RedisPublisher as RedisClientType,
      subscriber: RedisSubscriber as RedisClientType,
    }

    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys]!
          .connect()
          .then((res: any) =>
            console.log(`Connection Succesful to Redis ${name}`),
          )
          .catch((err: any) => console.log(`Error in DB connection ${err}`)),
      ),
    );

    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys]!.on("error", function (error) {
          console.error(error);
        }),
      ),
    );
  }

  async teardown() {
    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys]!.quit(),
      ),
    );
  }
}
export default new RedisHandlerClass();
