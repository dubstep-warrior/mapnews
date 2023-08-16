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

  // Gather users
  const users = await RedisClient.geoSearch(
    "user-locations",
    {
      latitude: article.location.coordinates[1],
      longitude: article.location.coordinates[0],
    },
    { radius: 5, unit: "km" },
  );

  // CHECK USAGE/ACTIVITY METRICS IF IT MAKE SENSE

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

// ACTION UPDATE CRON
cron.schedule("*/30 * * * *", async function () {
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

// // TODO CREATE AN UPDATE USER METRICS SCHEDULER
cron.schedule("* * * * *", async function () {
  const key = "user metrics";
  console.log(`Starting cron job on ${key}`);

  const collection = client.db("mapnews").collection("actions");

  const data = collection.find();
  const userData = {};
  for await (const doc of data) {
    if (doc.user in userData) {
      userData[doc.user][doc.category] =
        doc.category in userData[doc.user]
          ? userData[doc.user][doc.category] + 1
          : 1;
    } else {
      userData[doc.user] = {
        [doc.category]: 1,
        tags: {},
      };
    }

    for (let tag of doc.tags) {
      userData[doc.user]["tags"][tag] =
        tag in userData[doc.user]["tags"] ? userData[doc.user]["tags"] + 1 : 1;
    }
  }

  client
    .db("mapnews")
    .collection("users")
    .bulkWrite(
      userData.map((userID) => {
        return {
          updateOne: {
            filter: { _id: ObjectId(userID) },
            update: { usage: userData[userID] },
          },
        };
      }),
    )
    .then((res) => console.log(`Finish updating~ on ${key}`))
    .catch((err) => console.log(err));
});

// // NOTIFICATION SCHEDULER
// cron.schedule("* * * * *", async function () {
//   const key = "interactions";
//   console.log(`Starting cron job on ${key}`);

//   const popped = (await RedisClient.lRange(key, 0, -1)).map((string) => {
//     const obj = JSON.parse(string);
//     return {
//       ...obj,
//       user: new ObjectId(obj.user),
//       article: new ObjectId(obj.article),
//     };
//   });

//   if (!!popped.length) {
//     console.log(popped);
//   }

//   console.log("Finish updating~");
// });

cron.schedule("* * * * *", async function () {
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

// FOR TESTING
const test = async () => {
  const testVar = await RedisClient.geoSearch(
    "user-locations",
    { latitude: 1.3352529, longitude: 103.7592734 },
    { radius: 5, unit: "km" },
  );
  console.log(testVar);
};

// test()
