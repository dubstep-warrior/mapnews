import * as dotenv from "dotenv";
import RedisClient from "../clients/redis.client";
dotenv.config();

export const Cache = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req = args[0];

      try {
        console.log(req.baseUrl, req.path);
        const cache = await RedisClient.get(
          `${req.baseUrl}${req.path}${req.body["userId"]}`,
        );
        if (cache) {
          console.log("cache retrieved at ", req.path);
          return JSON.parse(cache);
        }

        const models = await originalMethod.apply(this, args);

        RedisClient.set(
          `${req.baseUrl}${req.path}${req.body["userId"]}`,
          JSON.stringify(models),
          {
            EX: 10,
          },
        );
        console.log(
          "set redis and retrieve mongodb at ",
          `${req.baseUrl}${req.path}${req.body["userId"]}`,
        );
        return models;
      } catch (err) {
        throw "Error in retrieving server cache";
      }
    };

    return descriptor;
  };
};
