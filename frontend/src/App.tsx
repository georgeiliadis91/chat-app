import React, { Fragment, useState } from "react";
import { ChatComponent } from "./views/ChatComponent";

function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <Fragment>
      <button onClick={() => setLoadClient((prevState) => !prevState)}>
        Open Chat
      </button>

      <br />
      {loadClient ? (
        <div className="chat-body">
          <ChatComponent />
        </div>
      ) : null}
    </Fragment>
  );
}

export default App;
