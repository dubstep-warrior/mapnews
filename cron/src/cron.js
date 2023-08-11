import * as dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import cron from "node-cron";

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

const client = new MongoClient(process.env.MONGODB_CLUSTER_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client.connect();

RedisClient.connect()
  .then(async (res) => {
    console.log(`Connection Succesful ${res}`);
  })
  .catch((err) => console.log(`Error in DB connection ${err}`));

// ACTION UPDATE CRON
cron.schedule("*/30 * * * *", async function () {
  const key = "actions";
  console.log(`Starting cron job on ${key}`);

  const popped = (await RedisClient.lRange(key, 0, -1)).map((string) => {
    const obj = JSON.parse(string);
    return {
      ...obj,
      user: new ObjectId(obj.user),
      time: new Date(obj.time),
    };
  });

  if (!!popped.length) {
    const collection = client.db("mapnews").collection(key);

    await collection.insertMany(popped).then(async () => {
      await RedisClient.lPop(key, popped.length);
    });
  }

  console.log(`Finish updating~ on ${key}`);
});

// TODO CREATE AN UPDATE USER METRICS SCHEDULER

// NOTIFICATION SCHEDULER
cron.schedule("* * * * *", async function () {
  const key = "interactions";
  console.log(`Starting cron job on ${key}`);

  const popped = (await RedisClient.lRange(key, 0, -1)).map((string) => {
    const obj = JSON.parse(string);
    return {
      ...obj,
      user: new ObjectId(obj.user),
      article: new ObjectId(obj.article),
    };
  });

  if (!!popped.length) {
    console.log(popped);
  }

  console.log("Finish updating~");
});
