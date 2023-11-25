export type AppState = {
  game: GameState
  appState: "CONNECTING" | "CONNECTED" | "ERROR"
  error?: string
}

export type GameState = {
  type: "ROBERT" | "SARAH"
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
