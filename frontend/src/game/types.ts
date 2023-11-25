export type AppState = {
  game: GameState
  appState: "CONNECTING" | "CONNECTED" | "ERROR"
  error?: string
}

export type GameState = {
  type: GameType
  isUserTurn: boolean
  gameState: "WON" | "LOST" | "PLAYING"
  health: number
  lastResponse: string
  messages: Message[]
  turnNumber: number
}

export type Message = {
  role: "user" | "assistant",
  content: string
}

export type GameType = "ROBERT" | "SARAH"

export type AppActions = {
  startGame: (type: GameType) => void
  exitGame: () => void
  respond: (message: string) => void
}
