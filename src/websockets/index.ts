import WebSocket from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import RedisClient from "../clients/redis.client";
// import {queryString} from "query-string";

export default async (expressServer: any) => {
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
    function connection(websocketConnection: any, connectionRequest: any, user: any) {
      const [_path, params] = connectionRequest?.url?.split("?") as any;
      const connectionParams = params;
      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      // consoley.log(connectionRequest);
      const currentUser = {...user}; 

      websocketConnection.on("message", (message: any) => {
        const parsedMessage = JSON.parse(message);

        // ['selectedArticle', 'articleDetails']
        console.log(parsedMessage);
        if(parsedMessage.type == 'location') {
          currentUser[parsedMessage.type] = parsedMessage.data 
        }
        websocketConnection.send(
          JSON.stringify({ message: "There be gold in them thar hills." }),
        );
      });
    },
  );

  websocketServer.on("disconnect", () => {
    console.log("disconnected");
  });

  return websocketServer;
};
