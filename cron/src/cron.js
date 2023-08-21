import * as dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import cron from "node-cron";
import { InterestAggregation } from "./aggregations/interest.aggregation.js";
import { ActivityAggregation } from "./aggregations/activity.aggregation.js";
import CronConfig from "./../config/cron.config.json";

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

const RedisSubscriber = RedisClient.duplicate();
const RedisPublisher = RedisClient.duplicate();
RedisPublisher.connect();
RedisSubscriber.connect();
RedisClient.connect();

RedisClient.on("error", function (error) {
  console.error(error);
  // I report it onto a logging service like Sentry.
});
RedisSubscriber.on("error", function (error) {
  console.error(error);
  // I report it onto a logging service like Sentry.
});
RedisPublisher.on("error", function (error) {
  console.error(error);
  // I report it onto a logging service like Sentry.
});

// EMERGENCY SUBSCRIPTION
// **********************
RedisSubscriber.subscribe("emergency", async (message) => {
  const article = JSON.parse(message);

  // Build notification
  const notification = {
    article: new ObjectId(article._id),
    type: "emergency",
    date: new Date(),
  };

  // Gather users
  const users = await RedisClient.geoSearch(
    "user-locations",
    {
      latitude: article.location.coordinates[1],
      longitude: article.location.coordinates[0],
    },
    { radius: 5, unit: "km" },
  );

  // CHECK ACTIVITY METRICS IF IT MAKE SENSE
  // CURRENT ISSUE: SUSCEPTIBLE TO NOTIFICATION SPAM

  if (!!users.length) {
    console.log(users);
    console.log(article.posted_by);
    notification["users"] = users
      .filter((userID) => userID !== article.posted_by)
      .map((userID) => new ObjectId(userID));

    const collection = client.db("mapnews").collection("notifications");

    collection.insertOne(notification).then(() => {
      console.log("added a new notification");
      users.forEach((userID) =>
        RedisPublisher.publish(userID, JSON.stringify(notification)),
      );
    });
  }
});

// GENERAL SUBSCRIPTION
// **********************
RedisSubscriber.subscribe("general", async (message) => {
  const article = JSON.parse(message);

  // Build notification
  const notification = {
    article: new ObjectId(article._id),
    type: "emergency",
    date: new Date(),
  };

  // Check if its worth creating notification
  // Check activity metrics in the area
  const activities = await client
    .db("mapnews")
    .collection("actions")
    .aggregate(ActivityAggregation(article))
    .toArray();

  if (!!activities.length) {
    // Gather users
    const nearByusers = new Set(
      await RedisClient.geoSearch(
        "user-locations",
        {
          latitude: article.location.coordinates[1],
          longitude: article.location.coordinates[0],
        },
        { radius: 30, unit: "km" },
      ),
    );

    // Gather users that will find this interesting
    const collection = client.db("mapnews").collection("users");

    const interestedUser = new Set(
      (await collection.aggregate(InterestAggregation(article)).toArray()).map(
        (user) => user._id,
      ),
    );

    // CURRENTLY USERS ARE NEARBY (ONLINE) AND INTERESTED, CHANGE SOON
    const users = nearByusers & interestedUser;

    if (!!users.length) {
      console.log(users);
      console.log(article.posted_by);
      notification["users"] = [...users]
        .filter((userID) => userID !== article.posted_by)
        .map((userID) => new ObjectId(userID));

      const collection = client.db("mapnews").collection("notifications");

      collection.insertOne(notification).then(() => {
        console.log("added a new notification");
        users.forEach((userID) =>
          RedisPublisher.publish(userID, JSON.stringify(notification)),
        );
      });
    }
  }
});

// ACTION UPDATE CRON
// per 30 mins -> */30 * * * *
cron.schedule(CronConfig["action-update"], async function () {
  const key = "actions";
  console.log(`Starting cron job on ${key}`);
  // const userData = {};
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
      await RedisClient.lPopCount(key, popped.length);
    });
  }

  console.log(`Finish updating~ on ${key}`);
});

// UPDATE USER METRICS SCHEDULER
cron.schedule(CronConfig["user-metrics"], async function () {
  const key = "user metrics";
  console.log(`Starting cron job on ${key}`);

  const collection = client.db("mapnews").collection("actions");

  const data = await collection.find().toArray();
  console.log("actions data from user metrics", data);
  const userData = {};
  for (const doc of data) {
    const user = doc.user.toHexString();
    if (user in userData) {
      userData[user]["category"][doc.category] =
        doc.category in userData[user]["category"]
          ? userData[user]["category"][doc.category] + 1
          : 1;
    } else {
      userData[user] = {
        category: {
          [doc.category]: 1,
        },
        tags: {},
      };
    }

    for (let tag of doc.tags) {
      userData[user]["tags"][tag] =
        tag in userData[user]["tags"] ? userData[user]["tags"][tag] + 1 : 1;
    }
  }

  console.log("user data from user metrics", userData);

  if (!!Object.keys(userData).length) {
    const commands = Object.keys(userData).map((userID) => {
      return {
        updateOne: {
          filter: { _id: new ObjectId(userID) },
          update: {
            $set: { usage: userData[userID] },
          },
        },
      };
    });

    console.log(commands);
    await client
      .db("mapnews")
      .collection("users")
      .bulkWrite(commands)
      .then((res) => console.log(`Finish updating~ on ${key}`))
      .catch((err) => console.log(err));
  }
});

// LOCATION UPDATE CRON
cron.schedule(CronConfig["location-update"], async function () {
  const key = "locations";
  console.log(`Starting cron job on ${key}`);

  const locations = {};

  const popped = await RedisClient.lRange(key, 0, -1).catch((err) =>
    console.log(err),
  );
  console.log(popped);
  popped.forEach((string) => {
    const obj = JSON.parse(string);
    locations[obj.id] = obj.location;
  });

  console.log(locations);
  console.log(popped.length);
  if (!!popped.length) {
    const members = Object.keys(locations).map((userID) => {
      return {
        longitude: locations[userID].longitude,
        latitude: locations[userID].latitude,
        member: userID,
      };
    });
    await RedisClient.geoAdd("user-locations", members)
      .then(() => {
        RedisClient.lPopCount(key, popped.length);
      })
      .catch((err) => console.log(err));
  }

  console.log("Finish updating~");
});
