import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { ChatComponent } from "./views/ChatComponent";

type FormData = {
  message: string;
};

function App() {
  const [loadClient, setLoadClient] = useState(true);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(({ message }) => {
    alert(message);
  });

  return (
    <Fragment>
      <button onClick={() => setLoadClient((prevState) => !prevState)}>
        Open Chat
      </button>

      <br />
      {loadClient ? (
        <div className="chat-body">
          <form onSubmit={onSubmit}>
            <input name="message" ref={register} />
            <input type="submit" />
          </form>

          <ChatComponent />
        </div>
      ) : null}
    </Fragment>
  );
}

export default App;
