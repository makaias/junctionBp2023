import { AppState } from "./AppState";

export dedfault function useAppState() : AppState  {
  return {
    game: {
      type: "ROBERT",
      isUserTurn: true,
      gameState: "PLAYING",
      health: 100,
      lastResponse: "",
      messages: [],
      turnNumber: 1,
    },
    appState: "CONNECTING",
    error: undefined
  }
}
