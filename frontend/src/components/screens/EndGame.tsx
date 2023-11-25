import { useAppActions } from "../../game/useAppActions";
import useAppState from "../../game/useAppState";

export const EndGame = () => {
  const actions = useAppActions();
  const appState = useAppState();
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("/endgame_background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex flex-col justify-center bg-blue-200 rounded-xl p-4">
        <h1 className="p-4 mb-10 text-3xl font-bold">Game Over</h1>
        <p className="mb-10">
          {appState.game?.messages[appState.game?.messages.length - 1]?.content}
        </p>

        <button
          onClick={() => actions.exitGame()}
          className="p-4 bg-blue-200 rounded-xl border-2 border-white"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};
