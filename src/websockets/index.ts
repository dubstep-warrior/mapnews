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
    console.log("server being upgraded");
    // console.log(request.query);
    // console.log(request)
    const [_path, params] = request?.url?.split("?") as any;

    const urlParams = new URLSearchParams(params);
    console.log(urlParams.get("authentication"));

    try {
      const decoded = jwt.verify(
        urlParams.get("authentication")!,
        process.env.SECRET_JWT_CODE!,
      ) as JwtPayload;

      if (decoded) {
        console.log("JWT verification succeeded");
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
      console.log("websocket connection");
      const [_path, params] = connectionRequest?.url?.split("?") as any;
      const connectionParams = params;
      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      // consoley.log(connectionRequest);
      const currentUser = { ...user };
      console.log("i am the current user:", currentUser);

      // RedisSub
      RedisSubscriber.subscribe(currentUser.id, async (message) => {
        console.log("SENDING OVER WS CONNECTION", message); // 'message'
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

        // ['selectedArticle', 'articleDetails', 'likedArticle', 'postedArticle', 'searchedArticles']
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
          ].includes(parsedMessage.name)
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
          // console.log('parsedMessage:',parsedMessage);
          // const job = await RedisClient.get('actions-job')

          RedisClient.LPUSH("actions", JSON.stringify(action));
          if (
            !["searchedArticles", "postedArticle"].includes(parsedMessage.name)
          ) {
            console.log(parsedMessage.data.id);
            RedisClient.LPUSH(
              "interactions",
              JSON.stringify({
                user: currentUser.id,
                action: parsedMessage.name,
                article: parsedMessage.data.id,
              }),
            );

            // if(parsedMessage.data.)
          }
        }
      });
    },
  );

  websocketServer.on("disconnect", () => {
    console.log("disconnected");
  });

  return websocketServer;
};
