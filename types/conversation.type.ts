import { InfoMes, Message } from "@/types/message.type";

export type Conversation = {
  _id: string;
  participants: InfoMes[];
  messages: Message[];
  created_at: string;
};
