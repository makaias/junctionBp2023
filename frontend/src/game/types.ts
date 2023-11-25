export type AppState = {
  game: GameState | null
  appState: "CONNECTING" | "CONNECTED" | "ERROR"
  error: string | null
}

export type GameState = {
  type: GameType
  isUserTurn: boolean
  gameState: "WON" | "LOST" | "PLAYING"
  health: number
  lastResponse: string
  messages: Message[]
  turnsLeft: number
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
