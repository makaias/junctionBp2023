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
  useSocketDispatch(dispatch, "text_received", (data) => ({ type: "TEXT_RECEIVED", text: data.text }));
  useSocketDispatch(dispatch, "send_damage", (data) => ({ type: "DAMAGE_RECEIVED", damage: data.damage }));
  useSocketDispatch(dispatch, "end_message", { type: "END_MESSAGE_RECEIVED" });
  useSocketDispatch(dispatch, "send_end_game", { type: "END_GAME" });
  // useSocketDispatch(dispatch, "gameCreated", (data) => ({

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
