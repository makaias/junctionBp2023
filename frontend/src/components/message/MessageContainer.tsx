import { Message } from "../../types";

interface MessageContainerProps {
  message: Message;
  hideDecision?: boolean;
}

export const MessagContainer = ({
  message,
  hideDecision = false,
}: MessageContainerProps) => {
  return message.senderRole === "system" ? (
    <SystemMessageContainer message={message} hideDecision={hideDecision} />
  ) : (
    <UserMessageContainer message={message} />
  );
};
