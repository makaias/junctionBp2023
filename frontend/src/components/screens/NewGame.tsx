import { useEffect, useState } from "react";
import { segmentColors, segments } from "./newGameConstants";
import { Modal } from "../modal/Modal";
import { useAppActions } from "../../game/useAppActions";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { BetterWheel } from "../wheel/BetterWheel";

export const NewGame = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [tutorialModal, setTutorialModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | undefined>();
  const [wheelWidth] = useState(() =>
    Math.min(400, window.innerWidth * 0.8, window.innerHeight * 0.8),
  );

  const actions = useAppActions();

  const onFinished = (winner: any) => {
    setSelected(winner);
  };

  const createNewGame = () => {
    const gameType = selected === "Sarah the Scatterer" ? "SARAH" : "ROBERT";
    actions.startGame(gameType);
  };

  const random = Math.random() > 0.5;
  const notify = () =>
    toast("For the best experience please use a bigger screen!");
  useEffect(() => {
    if (isMobile) {
      const id = notify();
      return () => toast.dismiss(id);
    }
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-blue-100"
      style={{
        backgroundImage: 'url("/home_background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => setTutorialModal(true)}
        className="border-orange-500 border-2 rounded-xl mb-4 p-4 text-orange-500 px-8 text-xl  bg-gradient-to-r from-[#000000aa] via-[#000000] to-[#000000aa] backdrop-blur-sm"
      >
        How to play
      </button>
      <div className="flex flex-col justify-center bg-gradient-to-r from-[#000000aa] via-[#000000] to-[#000000aa] backdrop-blur-sm text-orange-500 rounded-xl p-4">
        <h1 className="p-4 mb-10 text-3xl font-bold">GreenHeart Chronicles</h1>
        <button
          onClick={() => setModal(true)}
          className="p-4 bg-transparent rounded-xl border-2 border-orange-500 text-xl"
        >
          New Game
        </button>
      </div>
      {tutorialModal && (
        <Modal callback={() => setTutorialModal(false)}>
          <div className="flex flex-col gap-4 text-xl">
            <h1 className="text-2xl pb-4">Don't worry, it's easy!</h1>
            <p>
              Your goal is to convince the persona to change their mindset
              through clever arguments.
            </p>
            <p>
              Each of your argument's effectiveness is evaluated by the AI and
              you receive a score from -5 to 30.
            </p>
            <p>
              When you reach 100 score, you immediately win the game. If you
              fail to reach it in 10 turns you lose.
            </p>
            <p>
              If you are using clever arguments, or trying to understand the
              other's point of view, you can get more points.
            </p>
          </div>
        </Modal>
      )}
      {modal && (
        <Modal callback={() => setModal(false)}>
          <div className="flex w-full flex-col items-center justify-start">
            <div className="flex w-full mb-8 justify-center">
              <h1 className="text-2xl">The challenge:</h1>
            </div>
            {!selected ? (
              <BetterWheel
                segments={random ? segments : segments.reverse()}
                primaryColoraround="#fff"
                segColors={random ? segmentColors : segmentColors.reverse()}
                winningSegment=""
                onFinished={(winner: any) => onFinished(winner)}
                primaryColor="#262626"
                contrastColor="#D4D4D8"
                buttonText="Spin"
                isOnlyOnce={false}
                size={wheelWidth}
                upDuration={50}
                downDuration={500}
                fontFamily="Arial"
              />
            ) : (
              <div className="w-full pt-4 flex justify-center">
                <div className="flex flex-col gap-5 items-center">
                  <h1 className="w-full text-center text-2xl font-bold">
                    {selected}
                  </h1>
                  <img
                    className="w-64"
                    src={
                      selected === "Sarah the Scatterer"
                        ? "/sarah.png"
                        : "/robert.png"
                    }
                    alt="image"
                  />
                  <button
                    onClick={() => createNewGame()}
                    className="p-4 bg-transparent rounded-xl border-2 border-orange-500 w-fit text-xl"
                  >
                    Let's go
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
