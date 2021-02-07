import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { REACT_APP_ENDPOINT } from "../constants/constants";

interface Props {}

export const ChatComponent = (props: Props) => {
  const [response, setResponse] = useState("");

  console.log("the REACT_APP_ENDPOINT", REACT_APP_ENDPOINT);

  useEffect(() => {
    const socket: SocketIOClient.Socket = socketIOClient(REACT_APP_ENDPOINT);

    socket.on("message", (data: any) => {
      console.log(data);
      setResponse(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>The response: {response}</div>;
};
