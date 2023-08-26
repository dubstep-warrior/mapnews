import WebSocket from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import RedisClient, { RedisSubscriber } from "../clients/redis.client";
// import {queryString} from "query-string";
import * as http from "http";

export default async (expressServer: http.Server) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/ws",
  });

  expressServer.on("upgrade", (request: any, socket: any, head: any) => {
    const [_path, params] = request?.url?.split("?") as any;

    const urlParams = new URLSearchParams(params);

    try {
      const decoded = jwt.verify(
        urlParams.get("authentication")!,
        process.env.SECRET_JWT_CODE!,
      ) as JwtPayload;

      if (decoded) {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
          websocketServer.emit("connection", websocket, request, decoded);
        });
      }
    } catch (err) {
      console.log("JWT verification failed: ", err);
    }
  });

  websocketServer.on(
    "connection",
    function connection(
      websocketConnection: any,
      connectionRequest: any,
      user: any,
    ) {
      const [_path, params] = connectionRequest?.url?.split("?") as any;
      const connectionParams = params;
      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).

      const currentUser = { ...user };

      // RedisSub
      RedisSubscriber.subscribe(currentUser.id, async (message) => {
        const cache = await RedisClient.get(
          `/api/v1/notification/${currentUser.id}`,
        );
        if (cache) {
          RedisClient.set(
            `/api/v1/notification/${currentUser.id}`,
            JSON.stringify([...JSON.parse(cache), JSON.parse(message)]),
            {
              EX: 10,
            },
          );
        }
        websocketConnection.send(message);
      });

      websocketConnection.on("message", (message: any) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.name == "location") {
          currentUser[parsedMessage.name] = parsedMessage.data;
          RedisClient.RPUSH("locations", JSON.stringify(currentUser));
        } else if (
          [
            "selectedArticle",
            "articleDetails",
            "likedArticle",
            "postedArticle",
            "searchedArticles",
          ].includes(parsedMessage.name) &&
          ("category" in parsedMessage.data || "tags" in parsedMessage.data)
        ) {
          const action: any = {
            user: currentUser.id,
            action: parsedMessage.name,
            category: parsedMessage.data.category,
            tags: parsedMessage.data.tags,
            time: new Date(),
          };

          if (!!currentUser.location)
            action["location"] = {
              coordinates: [
                currentUser.location.longitude,
                currentUser.location.latitude,
              ],
            };

          RedisClient.LPUSH("actions", JSON.stringify(action));
        }
      });
    },
  );

  websocketServer.on("disconnect", () => {
    console.log("disconnected");
  });

  return websocketServer;
};
