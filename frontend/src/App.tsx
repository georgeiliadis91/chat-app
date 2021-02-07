import React, { useState } from "react";
import { ChatComponent } from "./views/ChatComponent";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      <button onClick={() => setLoadClient((prevState) => !prevState)}>
        STOP CLIENT
      </button>
      {loadClient ? <ChatComponent /> : null}
    </>
  );
}

export default App;
