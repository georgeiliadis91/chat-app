import React, { Fragment, useState } from "react";
import { ChatComponent } from "./views/ChatComponent";
import "./App.scss";

function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <main>
      <button
        className="toggle-chat"
        onClick={() => setLoadClient((prevState) => !prevState)}
      >
        Toggle Chat
      </button>

      {loadClient ? (
        <div className="chat-body">
          <ChatComponent />
        </div>
      ) : null}
    </main>
  );
}

export default App;
