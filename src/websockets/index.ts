import WebSocket from "ws";
// import {queryString} from "query-string";

export default async (expressServer: any) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/ws",
  });

  expressServer.on("upgrade", (request: any, socket: any, head: any) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      console.log("server being upgraded");
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split("?") as any;
      const connectionParams = params;
      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      console.log(connectionParams);

      websocketConnection.on("message", (message: any) => {
        const parsedMessage = JSON.parse(message);

        // ['selectedArticle', 'articleDetails']
        console.log(parsedMessage?.name ?? "");
        websocketConnection.send(
          JSON.stringify({ message: "There be gold in them thar hills." }),
        );
      });
    },
  );

  return websocketServer;
};
