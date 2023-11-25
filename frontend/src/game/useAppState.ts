import { useAppContext } from "./AppBackend";
import { AppState } from "./types";

export default function useAppState() : AppState  {
  const {appState} = useAppContext();
  return appState;
}
