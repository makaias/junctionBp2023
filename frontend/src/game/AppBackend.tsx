import React, { useEffect, useMemo } from "react";
import { AppActions, AppState, GameType } from "./types";
import {
  useSocket, useSocketAnyEvent
} from "../hooks/useSocket";
import { appReducer } from "./appReducer";
import { useAppSocketSubscribe } from "./appSocketSubscribe";

type AppBackend = {
  appState: AppState;
  actions: AppActions;
};

const initialState: AppState = {
  game: null,
  appState: "CONNECTING",
  error: null,
};

const AppBackendContext = React.createContext<AppBackend | null>(null);
export function useAppContext() {
  const context = React.useContext(AppBackendContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppBackendContext");
  }
  return context;
}

export function AppBackend(props: { children: React.ReactNode }) {
  const socket = useSocket();
  const [appState, dispatch] = React.useReducer(appReducer, initialState);

  useSocketAnyEvent((...args: any) => console.log("Socket event", ...args));
  useAppSocketSubscribe(dispatch)

  const actions: AppActions = useMemo(
    () => ({
      startGame: (type: GameType) => {
        socket.emit("execute", {
          messages: [],
          details: {
            game_type: type,
            hp: 100,
            turns_remaining: 10,
          },
        });
        dispatch({ type: "GAME_CREATED", gameType: type });
      },
      exitGame: () => {
        dispatch({ type: "EXIT_GAME" });
      },
      respond: (text: string) => {
        if(!appState.game) return
        if(!appState.game.isUserTurn) return
        dispatch({ type: "USER_RESPONSE", text });
        socket.emit("execute", {
          messages: [...appState.game.messages, { role: "user", content: text }],
          details: {
            game_type: appState.game.type,
            hp: appState.game.health,
            turns_remaining: appState.game.turnNumber, //TODO calculate this
          },
        });  
      },
    }),
    [dispatch, appState],
  );

  const ctx = {
    appState,
    actions,
  };

  useEffect(() => {
    console.log("App state changed", appState);
  }, [appState]);

  useEffect(() => {
    (window as any).actions = actions;
  }, [actions]);

  return (
    <AppBackendContext.Provider value={ctx}>
      {props.children}
    </AppBackendContext.Provider>
  );
}

