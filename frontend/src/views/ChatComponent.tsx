import { link } from "fs";
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { REACT_APP_ENDPOINT } from "../constants/constants";

interface Props {}

export const ChatComponent = (props: Props) => {
  const [messageList, setMessageList] = useState<string[]>([]);

  console.log("the REACT_APP_ENDPOINT", REACT_APP_ENDPOINT);

  useEffect(() => {
    const socket: SocketIOClient.Socket = socketIOClient(REACT_APP_ENDPOINT);

    socket.on("message", (data: any) => {
      setMessageList((prevState) => {
        return [...prevState, data];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ul>
      {messageList.map((message, index) => (
        <li>
          #{index + 1} - {message}
        </li>
      ))}
    </ul>
  );
};
