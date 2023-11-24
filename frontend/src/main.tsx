import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App.tsx";
import { SocketContext } from "./hooks/useSocket.ts";
import "./index.css";

const socket = io("/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContext.Provider value={{ io: socket }}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
);
