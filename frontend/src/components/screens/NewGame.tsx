import { useState } from "react";
import { segmentColors, segments } from "./newGameConstants";
import WheelComponent from "react-wheel-of-prizes-react-upgrade";
import { Modal } from "../modal/Modal";
import { useAppActions } from "../../game/useAppActions";

export const NewGame = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | undefined>();
  const actions = useAppActions();

  const onFinished = (winner: any) => {
    setSelected(winner);
  };

  const createNewGame = () => {
    const gameType = selected === "Sarah the Scatterer" ? "SARAH" : "ROBERT";
    actions.startGame(gameType);
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-blue-100"
      style={{
        backgroundImage: 'url("/home_background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex flex-col justify-center bg-gradient-to-r from-[#000000E6] to-[#000000CC] text-orange-500 rounded-xl p-4">
        <h1 className="p-4 mb-10 text-3xl font-bold">
          Let's make the world a better place!
        </h1>
        <button
          onClick={() => setModal(true)}
          className="p-4 bg-transparent rounded-xl border-2 border-orange-500"
        >
          New Game
        </button>
      </div>
      {modal && (
        <Modal callback={() => setModal(false)}>
          <div>
            <div className="flex w-full justify-center">
              <h1 className="text-2xl">The challenge:</h1>
            </div>
            {!selected ? (
              <WheelComponent
                segments={segments}
                segColors={segmentColors}
                onFinished={(winner: any) => onFinished(winner)}
                primaryColor="#262626"
                contrastColor="#D4D4D8"
                buttonText="Spin"
                isOnlyOnce={false}
                size={250}
                upDuration={50}
                downDuration={500}
                fontFamily="Arial"
              />
            ) : (
              <div className="w-full pt-20 flex justify-center">
                <div className="flex flex-col gap-5 items-center">
                  <h1 className="w-full text-center text-2xl font-bold">
                    {selected}
                  </h1>
                  <img
                  className='w-64'
                    src={selected === "Sarah the Scatterer" ? "/sarah.png" : "/robert.png"}
                    alt="image"
                  />
                  <button
                    onClick={() => createNewGame()}
                    className="p-4 bg-transparent rounded-xl border-2 border-orange-500 w-fit"
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
