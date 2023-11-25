import { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  callback: Function;
}

export const Modal = ({ children, callback }: OverlayProps) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md flex justify-center items-center z-[999]"
      onClick={() => callback()}
    >
      <div
        className="w-full max-w-2xl h-[80%] bg-black text-orange-500 flex flex-col gap-4 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-secondary-300 flex w-full p-4 justify-end">
          <button
            onClick={() => callback()}
            className="p-2 bg-secondary-100 rounded-xl"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-8 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
