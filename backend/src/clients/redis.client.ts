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
    this.clients["client"] = createClient({
      url: process.env.REDIS_URL,
    });
    this.clients["publisher"] = this.clients["client"].duplicate();
    this.clients["subscriber"] = this.clients["client"].duplicate(); 

    await Promise.all(
      Object.keys(this.clients).map((name) =>
        this.clients[name as HandlerKeys]!.connect()
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
