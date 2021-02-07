import { link } from "fs";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import socketIOClient from "socket.io-client";
import { REACT_APP_ENDPOINT } from "../constants/constants";

interface Props {}

type FormData = {
  message: string;
};

export const ChatComponent = (props: Props) => {
  const [messageList, setMessageList] = useState<string[]>([]);

  const socket = useRef<SocketIOClient.Socket>();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(({ message }) => {
    socket.current?.send(message);
  });

  useEffect(() => {
    socket.current = socketIOClient(REACT_APP_ENDPOINT);

    socket.current.on("message", (data: any) => {
      setMessageList((prevState) => {
        return [...prevState, data];
      });
    });

    return () => {
      if (socket?.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input name="message" ref={register} />
        <input type="submit" />
      </form>
      <ul>
        {messageList.map((message, index) => (
          <li>
            #{index + 1} - {message}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
