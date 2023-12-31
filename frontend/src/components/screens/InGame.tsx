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
      className="w-screen h-screen max-h-full flex justify-center items-end p-4 text-orange-500 text-2xl"
      style={{
        backgroundImage: calculateBackground(),
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full h-full max-w-5xl flex-col justify-end items-stretch">
        <div className="w-full flex-1 justify-end flex max-h-[45vh]">
          <img
            className=""
            src={appState.game?.type === "SARAH" ? "/sarah.png" : "/robert.png"}
            alt="image"
          />
        </div>
        {/* <!-- Bottom panel --> */}
        <div className="flex flex-1 w-full flex-col  max-h-72  bg-gradient-to-r from-[#000000aa] via-[#000000] to-[#000000aa] backdrop-blur-sm rounded-xl">
          <div className="w-full flex border-gray-700 border-b-2 p-4">
            <div className="flex flex-col md:flex-row w-full gap-4  justify-between ">
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
          <div className="w-full overflow-y-auto flex flex-1 flex-col min-h-[32px] max-h-52">
            <div className="w-full flex-1 space-between">
              {appState.game?.isUserTurn && nextPressed ? (
                <div className="p-4 pb-0">
                  <textarea
                    ref={inputRef}
                    className="resize-none flex-1 w-full h-full bg-gray-700"
                    maxLength={500}
                    rows={4}
                    value={currentMessage}
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
                <div className="flex flex-1 max-h-52 p-4">
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
          </div>
          <div className="flex h-fit justify-between p-4">
            <div className="flex gap-4">
              {(appState.game?.messages.length ?? 0) > 0 &&
                appState.game?.messages[appState.game.messages.length - 1]
                  .role === "assistant" &&
                nextPressed && (
                  <button
                    onClick={() => {
                      setNextPressed(false);
                    }}
                  >
                    <div className="flex gap-2 items-center">
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
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>

                      <span>View Response</span>
                    </div>
                  </button>
                )}
              <button onClick={() => exitGame()}>Exit</button>
            </div>
            {appState.game?.isUserTurn &&
              (currentMessage.length > 0 || !nextPressed) && (
                <button
                  onClick={() => {
                    if (nextPressed) {
                      actions.respond(currentMessage);
                      setCurrentMessage("");
                      setNextPressed(false);
                    } else {
                      if (
                        appState.game &&
                        (appState.game.health <= 0 ||
                          appState.game.turnsLeft <= 0)
                      ) {
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
  );
};
