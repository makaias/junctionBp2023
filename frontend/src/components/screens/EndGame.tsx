import { useAppActions } from "../../game/useAppActions";
import useAppState from "../../game/useAppState";

export const EndGame = () => {
  const actions = useAppActions();
  const appState = useAppState();
  return (
    <div
      className="text-xl w-screen h-screen flex justify-center items-center text-orange-500"
      style={{
        backgroundImage: 'url("/endgame_background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full max-w-2xl flex-col justify-center bg-gradient-to-r from-[#000000E6] to-[#000000CC] rounded-xl p-4">
        <h1 className="p-4 mb-10 text-3xl font-bold text-center">
          {appState.game?.gameState === "LOST"
            ? "Better luck next time!"
            : "Congratulations, you convinced someone to save the world!"}
        </h1>
        <p className="mb-10 text-center">
          {appState.game?.messages[appState.game?.messages.length - 1]?.content}
        </p>

        <button
          onClick={() => actions.exitGame()}
          className="p-4 bg-transparent rounded-xl border-2 border-orange-500"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};
