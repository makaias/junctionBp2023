import { useRef, useEffect, useState } from "react";
import { Progress } from "../progress/Progress";
import { useAppActions } from "../../game/useAppActions";
import useAppState from "../../game/useAppState";

export const InGame = () => {
  const actions = useAppActions();
  const appState = useAppState();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [nextPressed, setNextPressed] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus());
    }
  }, [nextPressed]);

  const names = {
    ROBERT: "Robert the Rubber Burner",
    SARAH: "Sarah the Scatterer",
  };

  const calculateBackground = () => {
    if (appState.game?.type === "ROBERT") {
      if (appState.game.health < 33) {
        return 'url("/robert_bg_3.png")';
      }
      if (appState.game.health < 66) {
        return 'url("/robert_bg_2.png")';
      }
      return 'url("/robert_bg_1.png")';
    }
    if (appState.game?.type === "SARAH") {
      if (appState.game.health < 33) {
        return 'url("/sarah_bg_3.png")';
      }
      if (appState.game.health < 66) {
        return 'url("/sarah_bg_2.png")';
      }
      return 'url("/sarah_bg_1.png")';
    }
  };

  const exitGame = () => {
    actions.exitGame();
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-end p-4 text-orange-500 text-2xl"
      style={{
        backgroundImage: calculateBackground(),
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full max-w-5xl flex-col justify-center">
        <div className="w-full justify-end flex">
          <img
            className=""
            src={appState.game?.type === "SARAH" ? "/sarah.png" : "/robert.png"}
            alt="image"
          />
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col">
            <div className="w-full flex border-gray-700 border-b-2">
              <div className="flex w-full gap-4 bg-gradient-to-r from-[#000000E6] to-[#000000AA] p-4 justify-between rounded-t-xl">
                <div className="flex gap-4">
                  <p className="font-semibold whitespace-nowrap">
                    {appState.game?.isUserTurn && nextPressed
                      ? "You"
                      : appState.game
                        ? names[appState.game.type]
                        : ""}
                  </p>
                  <p className="whitespace-nowrap">
                    Rounds left: {appState.game?.turnsLeft}
                  </p>
                </div>
                <div className="w-full flex gap-2 justify-end">
                  <span>Attitude:</span>
                  <Progress value={appState.game?.health} />
                  {appState.game?.lastTurnDamage !== undefined && (
                    <div>{`${
                      appState.game.lastTurnDamage > 0 ? "+" : ""
                    }${appState.game?.lastTurnDamage}`}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col max-w-5xl bg-gradient-to-r from-[#000000E6] to-[#000000AA]  p-4 h-72 rounded-b-xl">
              <div className="w-full h-full space-between">
                {appState.game?.isUserTurn && nextPressed ? (
                  <div>
                    <textarea
                      ref={inputRef}
                      className="resize-none flex-1 w-full h-full bg-gray-700"
                      maxLength={500}
                      rows={4}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Give us your best arguments..."
                      onKeyDown={(e) => {
                        if (
                          e.code === "Enter" &&
                          currentMessage.length > 0 &&
                          nextPressed
                        ) {
                          actions.respond(currentMessage);
                          setCurrentMessage("");
                          setNextPressed(false);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="overflow-y-scroll flex h-full max-h-52 p-4">
                    {appState.game?.lastResponse ? (
                      <p>
                        {appState.game?.lastResponse}
                        {!appState.game?.isUserTurn && "..."}
                      </p>
                    ) : (
                      <p>
                        {
                          appState.game?.messages[
                            appState.game?.messages.length - 1
                          ]?.content
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex h-fit justify-between">
                <button onClick={() => exitGame()}>Exit</button>
                {appState.game?.isUserTurn &&
                  (currentMessage.length > 0 || !nextPressed) && (
                    <button
                      onClick={() => {
                        if (nextPressed) {
                          actions.respond(currentMessage);
                          setCurrentMessage("");
                          setNextPressed(false);
                        } else {
                          if (appState.game && appState.game.health <= 0) {
                            actions.respond("");
                          } else {
                            setNextPressed(true);
                          }
                        }
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <span>Next</span>
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
                      </div>
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
