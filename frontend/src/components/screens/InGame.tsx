import { useState } from "react";
import { Progress } from "../progress/Progress";
import { useAppActions } from "../../game/useAppActions";
import useAppState from "../../game/useAppState";

export const InGame = () => {
  const [userTurn, setUserTurn] = useState<boolean>(false);
  const actions = useAppActions();
  const appState = useAppState();

  const calculateBackground = () => {
    if (appState.game?.type === 'ROBERT') {
      return 'url("/robert_bg_1.jpg")'
    }
    return 'url("/background.jpg")'
  }

  const exitGame = () => {
    actions.exitGame();
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-end p-4"
      style={{
        backgroundImage: calculateBackground(),
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full max-w-5xl flex-col justify-center">
        <div className="w-full justify-end flex">
          <img className="" src={appState.game?.type === 'SARAH' ? '/sarah.png' : '/robert.png'} alt="" />
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col">
            <div className="w-full flex border-white border-b-2">
              <div className="flex w-full gap-4 bg-gray-200 p-4 opacity-90">
                <p>Name</p>
                <p className="whitespace-nowrap">Rounds left: 8</p>
                <Progress />
              </div>
            </div>
            <div className="w-full flex flex-col max-w-5xl bg-gray-200 p-4 opacity-90 h-40">
              <div className="w-full h-full space-between">
                {userTurn ? (
                  <div>
                    <textarea
                      className="resize-none flex-1 w-full h-full"
                      maxLength={500}
                      rows={4}
                    />
                  </div>
                ) : (
                  <div className="overflow-y-scroll flex h-full">
                    <p>
                      reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    </p>
                  </div>
                )}
              </div>
              <div className="flex h-fit justify-between">
                <button onClick={() => exitGame()}>Exit</button>
                <button onClick={() => setUserTurn(!userTurn)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
