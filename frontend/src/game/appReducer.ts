import { AppState, GameType } from "./types";

export function appReducer(state: AppState, action: ReducerMessage): AppState {
  console.log("appReducer", action, state);
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
    case "SOCKET_CONNECTED":
      return {
        ...state,
        appState: "CONNECTED",
      };
    default:
      console.warn("Unhandled reducer event", action);
      return state;
  }
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

type SocketConnectedMessage = ReducerMessageBase & {
  type: "SOCKET_CONNECTED";
};

type ReducerMessage =
  | GameCreatedMessage
  | ExitGameMessage
  | SocketConnectedMessage;
