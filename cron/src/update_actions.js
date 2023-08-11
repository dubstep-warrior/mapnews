import * as dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import cron from "node-cron";

cron.schedule("*/5 * * * *", async function () {
  console.log("Starting cron job");
  const RedisClient = createClient({
    url: process.env.REDIS_URL,
  });

  await RedisClient.connect()
    .then(async (res) => {
      console.log(`Connection Succesful ${res}`);
    })
    .catch((err) => console.log(`Error in DB connection ${err}`));

  const popped = (await RedisClient.lRange("actions", 0, -1)).map((string) => {
    const obj = JSON.parse(string);
    return {
      ...obj,
      user: new ObjectId(obj.user),
      time: new Date(obj.time),
    };
  });

  if (!!popped.length) {
    const client = new MongoClient(process.env.MONGODB_CLUSTER_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const collection = client.db("mapnews").collection("actions");

    await collection
      .insertMany(popped)
      .then(await RedisClient.lPop("actions", popped.length));
  }

  console.log("Finish updating~");
});
