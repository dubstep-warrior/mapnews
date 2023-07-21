import * as dotenv from "dotenv"; 
import RedisClient from "../clients/redis.client";
dotenv.config();

export const Cache = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req = args[0];  

      try { 
        const cache = await RedisClient.get(`${req.body["userId"]}${req.path}`)
        if(cache) {
            console.log('cache retrieved at ', req.path)
            return JSON.parse(cache)
        }
        
        const articles = await originalMethod.apply(this, args);

        RedisClient.set(
            `${req.body["userId"]}${req.path}`,
            JSON.stringify(articles),
            {
              EX: 10,
            }
          ) 
        console.log('set redis and retrieve mongodb at ', req.path )
        return articles
      } catch (err) {
        throw "Error in retrieving server cache";
      }
    };

    return descriptor;
  };
};
