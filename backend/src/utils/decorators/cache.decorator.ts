import * as dotenv from "dotenv";
import RedisClient from "../../clients/redis.client";
import bypass from "../resolvers/bypass-resolver";
dotenv.config();

export const Cache = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req = args[0];

      try {
        if (!req.body["userId"]) throw "No user";
        const cache = await RedisClient.get(
          `${req.baseUrl}${req.path}/${req.body["userId"]}`,
        );
        if (cache) {
          return JSON.parse(cache);
        }

        const models = await originalMethod.apply(this, args);

        RedisClient.set(
          `${req.baseUrl}${req.path}/${req.body["userId"]}`,
          JSON.stringify(models),
          {
            EX: 10,
          },
        );
        console.log(
          "set redis and retrieve mongodb at ",
          `${req.baseUrl}${req.path}/${req.body["userId"]}`,
        );
        return models;
      } catch (err) {
        console.log(propertyKey, req.path);
        if (bypass(req.path)) {
          console.log("yes we are bypassing cache");
          return originalMethod.apply(this, args);
        } else throw "Error in retrieving server cache";
      }
    };

    return descriptor;
  };
};
