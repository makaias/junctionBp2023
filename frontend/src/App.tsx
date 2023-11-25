import { useSocketEvent } from "./hooks/useSocket";
import { InGame } from "./components/screens/InGame";
import useAppState from "./game/useAppState";
import { EndGame } from "./components/screens/EndGame";
import { NewGame } from "./components/screens/NewGame";
import { Spinner } from "./components/spinner/Spinner";

function App() {
  const appState = useAppState();

  useSocketEvent("connect", () => console.log("REEEEEEE"));

  switch (appState.appState) {
    case "CONNECTING":
      return <Spinner message="Waiting for server..."/>;
    case "CONNECTED":
      if (!appState.game) return <NewGame />;
      switch (appState.game.gameState) {
        case "PLAYING":
          return <InGame />;
        default:
          return <EndGame />;
      }
    case "ERROR":
      return <div>error</div>;
  }
}

export default App;
