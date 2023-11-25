import { AppState, GameType } from "./types";

export function appReducer(state: AppState, action: ReducerMessage): AppState {
  console.log("Reducer event", action);
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
    case "TEXT_RECEIVED":
      return {
        ...state,
        game: state.game && {
          ...state.game,
          lastResponse: state.game.lastResponse + action.text,
        },
      };
    case "DAMAGE_RECEIVED":
      return {
        ...state,
        game: state.game && {
          ...state.game,
          health: Math.max(state.game.health - action.damage, 0),
        },
      };
    case "END_MESSAGE_RECEIVED":
      return {
        ...state,
        game: (!state.game || state.game.isUserTurn) ? state.game : {
          ...state.game,
          lastResponse: "",
          isUserTurn: true,
          messages: [...state.game.messages, {
            role: "assistant",
            content: state.game.lastResponse,
          }],
        },
      };
    case "SOCKET_DISCONNECTED":
      return {
        ...state,
        appState: "CONNECTING",
      };
    case "USER_RESPONSE":
      return {
        ...state,
        game: state.game && {
          ...state.game,
          isUserTurn: false,
          messages: [...state.game.messages, {
            role: "user",
            content: action.text,
          }],
        },
      };
    case "END_GAME":
      return {
        ...state,
        game: state.game && {
          ...state.game,
          gameState: state.game.health <= 0 ? "WON" : "LOST",
          isUserTurn: false,
        },
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

type UserResponseMessage = ReducerMessageBase & {
  type: "USER_RESPONSE";
  text: string;
};

type SocketConnectedMessage = ReducerMessageBase & {
  type: "SOCKET_CONNECTED";
};

type SocketDisconnectedMessage = ReducerMessageBase & {
  type: "SOCKET_DISCONNECTED";
};

type SocketTextReceivedMessage = ReducerMessageBase & {
  type: "TEXT_RECEIVED";
  text: string;
};

type SocketDamageReceivedMessage = ReducerMessageBase & {
  type: "DAMAGE_RECEIVED";
  damage: number;
};

type SocketEndMessageReceivedMessage = ReducerMessageBase & {
  type: "END_MESSAGE_RECEIVED";
};

type SocketEndGameMessage = ReducerMessageBase & {
  type: "END_GAME";
};


export type ReducerMessage =
  | GameCreatedMessage
  | ExitGameMessage
  | SocketConnectedMessage
  | SocketDisconnectedMessage
  | SocketTextReceivedMessage
  | SocketDamageReceivedMessage
  | SocketEndMessageReceivedMessage
  | UserResponseMessage
  | SocketEndGameMessage;
