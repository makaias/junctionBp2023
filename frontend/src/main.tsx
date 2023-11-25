import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App.tsx";
import { SocketContext } from "./hooks/useSocket.ts";
import "./index.css";
import { AppBackend } from "./game/AppBackend.tsx";

const socket = io("/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContext.Provider value={{ io: socket }}>
      <AppBackend>
        <App />
      </AppBackend>
    </SocketContext.Provider>
  </React.StrictMode>,
);
