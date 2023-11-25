
export type Sender = "system" | "user";

export type Request = {
  content: string;
  role: Sender;
};

export type Execution = {
  id: string;
  request: Request;
  status: "requested" | "scheduled" | "started" | "completed";
  progress: number | null;
};

export type TextReceivedEvent = {
  id: string;
  text: string;
}


export type Asset = {
  id: string,
  filename: string,
  type: string
}

export interface MessageBase {
  type: "text" | "error";
}

export interface TextFragment extends MessageBase {
  type: "text";
  text: string;
}

export interface ErrorFragment extends MessageBase {
  type: "error";
}

export type MessageFragment = TextFragment | ErrorFragment;

export type Message = {
  fragments: MessageFragment[];
  senderRole: Sender;
  decision: string[];
};
