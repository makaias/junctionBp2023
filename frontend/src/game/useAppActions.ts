import { useAppContext } from "./AppBackend";
import { AppActions } from "./types";

export function useAppActions(): AppActions {
  const { actions } = useAppContext();
  return actions;
}
