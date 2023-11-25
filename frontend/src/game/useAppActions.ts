import {AppActions, GameType} from "./types"

export function useAppActions(): AppActions {
  return {
    stargGame: () => {},
    exitGame: void,
    respond: void,
  }
}
