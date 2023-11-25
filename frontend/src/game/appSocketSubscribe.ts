import { ReducerMessage } from "./appReducer";
import {
  useSocketEvent as useSocketEventBase
} from "../hooks/useSocket";
import { useCallback } from "react";

export function useAppSocketSubscribe(
  dispatch: (action: ReducerMessage) => void,
) {
  useSocketDispatch(dispatch, "connect", { type: "SOCKET_CONNECTED" });
  useSocketDispatch(dispatch, "disconnect", { type: "SOCKET_DISCONNECTED" });

}

function useSocketDispatch(
  dispatch: (action: ReducerMessage) => void,
  event: string,
  action: ReducerMessage | ((data: any) => ReducerMessage),
) {
  useSocketEvent(
    event,
    (data) => {
      const payload = typeof action == "function" ? action(data) : action;
      dispatch(payload);
    },
    [dispatch, action],
  );
}

function useSocketEvent(
  event: string,
  callback: (...data: any[]) => void,
  deps: any[],
) {
  useSocketEventBase(event, useCallback(callback, deps));
}
