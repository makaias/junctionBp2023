import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App.tsx";
import { SocketContext } from "./hooks/useSocket.ts";
import "./index.css";
import { AppBackend } from "./game/AppBackend.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const socket = io(import.meta.env.VITE_BACKEND_URL || "/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContext.Provider value={{ io: socket }}>
      <AppBackend>
        <App />
        <ToastContainer />
      </AppBackend>
    </SocketContext.Provider>
  </React.StrictMode>,
);
