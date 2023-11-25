import { useState } from "react";
import { Progress } from "../progress/Progress";

export const InGame = () => {
  const [userTurn, setUserTurn] = useState<boolean>(false);
  return (
    <div
      className="w-screen h-screen flex justify-center items-end p-4"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex w-full max-w-2xl flex-col justify-center">
        <div className="w-full justify-center flex">
          <img className="w-60 h-60" src="/man.png" alt="" />
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
            <div className="w-full flex max-w-2xl bg-gray-200 p-4 opacity-90 h-40">
              <div className="w-full">
                {userTurn ? (
                  <div>
                    <textarea
                      className="resize-none flex-1 w-full h-full"
                      maxLength={500}
                      rows={4}
                    />
                  </div>
                ) : (
                  <div className="overflow-y-scroll">
                    <p>
                      reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    </p>
                  </div>
                )}
              </div>
              <div className="flex h-full items-end">
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
