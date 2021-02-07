import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import socketIOClient from "socket.io-client";
import { REACT_APP_ENDPOINT } from "../constants/constants";
import "./ChatComponent.scss";
interface Props {}

type FormData = {
  message: string;
};

export const ChatComponent = (props: Props) => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [socket] = useState(socketIOClient(REACT_APP_ENDPOINT));

  // const socket = useRef<SocketIOClient.Socket>();

  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = handleSubmit(({ message }) => {
    setMessageList((prevState) => {
      return [...prevState, message];
    });
    socket.send(message);
    setValue("message", "");
  });

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessageList((prevState) => {
        return [...prevState, data];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <form onSubmit={onSubmit} className="form-input">
        <input className="message-box" name="message" ref={register} />
        <input type="submit" />
      </form>
      <ul>
        {messageList.map((message, index) => (
          <li>
            #{index + 1} - {message}
          </li>
        ))}
      </ul>
    </div>
  );
};
