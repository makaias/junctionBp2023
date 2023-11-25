import { Message } from "../../types";

interface UserMessageContainerProps {
  message: Message;
}

export const UtsxserMessageContainer = ({
  message,
}: UserMessageContainerProps) => {
  return (
    <div className="justify-items-end grid h-fit w-full">
      <div className="flex items-end">
        <div className=" rounded-xl p-4 m-4 ml-16">
          {message.fragments.map((fragment, idx) => {
            return fragment.type === "text" ? (
              <div key={idx}>{fragment.text}</div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};
