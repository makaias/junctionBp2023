import { useState } from "react";
import { segmentColors, segments } from "./newGameConstants";
import WheelComponent from "react-wheel-of-prizes-react-upgrade";
import { Modal } from "../modal/Modal";

export const NewGame = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | undefined>();

  const onFinished = (winner: any) => {
    console.log(winner);
    setSelected(winner)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-100">
      <div className="flex flex-col justify-center">
        <h1 className="p-4 mb-10 text-3xl font-bold">
          Let's make the world a better place!
        </h1>
        <button
          onClick={() => setModal(true)}
          className="p-4 bg-blue-200 rounded-xl border-2 border-white"
        >
          New Game
        </button>
      </div>
      {modal && (
        <Modal callback={() => setModal(false)}>
          <div>
            <div className="flex w-full justify-center">
              <h1 className="text-2xl">Your next opponent:</h1>
            </div>
            {!selected ? (
              <WheelComponent
                segments={segments}
                segColors={segmentColors}
                winningSegment="won 10"
                onFinished={(winner: any) => onFinished(winner)}
                primaryColor="black"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={false}
                size={250}
                upDuration={50}
                downDuration={500}
                fontFamily="Arial"
              />
            ) : (
            <div className="w-full pt-20 flex justify-center">
              <div className='flex flex-col gap-5 items-center'>
              <h1 className="w-full text-center text-2xl font-bold">{selected}</h1>
              <button className="p-4 bg-blue-200 rounded-xl border-2 border-white w-fit">Let's go</button>
              </div>
            </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
