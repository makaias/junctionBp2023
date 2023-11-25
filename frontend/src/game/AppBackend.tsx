import React, { useCallback, useMemo } from "react";
import { AppActions, AppState, GameType } from "./types";
import { useSocket } from "../hooks/useSocket";

type AppBackend = {
  appState: AppState;
  actions: AppActions;
};

const initialState: AppState = {
  game: null,
  appState: "CONNECTING",
  error: null,
};

function appReducer(state: AppState, action: ReducerMessage): AppState {
  switch (action.type) {
    case "GAME_CREATED":
      return {
        ...state,
        game: {
          type: action.gameType,
          gameState: "PLAYING",
          health: 100,
          isUserTurn: false,
          lastResponse: "",
          messages: [],
          turnNumber: 1,
        },
      };
    case "EXIT_GAME":
      return {
        ...state,
        game: null,
      };
    default:
      return state;
  }
}

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

  const actions: AppActions = useMemo(
    () => ({
      startGame: (type: GameType) => {
        socket.emit("EXECUTE", {
          messages: [],
          details: {
            game_type: type,
            hp: 100,
            turnsRemaining: 10,
          },
        });
        dispatch({ type: "GAME_CREATED", gameType: type });
      },
      exitGame: () => {
        dispatch({ type: "EXIT_GAME" });
      },
      respond: () => {},
    }),
    [dispatch],
  );

  const ctx = {
    appState,
    actions,
  };

  return (
    <AppBackendContext.Provider value={ctx}>
      {props.children}
    </AppBackendContext.Provider>
  );
}

type ReducerMessageBase = {
  type: string;
};

type GameCreatedMessage = ReducerMessageBase & {
  type: "GAME_CREATED";
  gameType: GameType;
};

type ExitGameMessage = ReducerMessageBase & {
  type: "EXIT_GAME";
};

type ReducerMessage = GameCreatedMessage | ExitGameMessage;
