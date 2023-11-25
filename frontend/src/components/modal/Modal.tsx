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
        className="w-full relative max-w-2xl h-[80%] bg-gradient-to-r from-[#000000aa] via-[#000000] to-[#000000aa] p-4 text-orange-500 flex flex-col gap-4 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => callback()}
          className="p-2 absolute top-4 right-4 rounded-xl"
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
        <div className="p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
