import { createContext, useContext, useEffect } from "react";
import type { Socket } from "socket.io-client";

type SocketContextProps = {
  io: Socket;
};

export const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocketEvent = (
  event: string,
  handler: (...args: any) => void,
) => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketEvent must be used within a SocketContext!");
  }
  const { io } = context;
  useEffect(() => {
    io.on(event, handler);
    return () => void io.off(event, handler);
  }, [io, event, handler]);
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketContext!");

  const { io } = context;
  return io;
};
