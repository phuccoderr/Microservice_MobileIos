import { chatsAxiosClient } from "@/api/axiosClient";

export const chatsApi = {
  getConversation(id: string) {
    const url = `conversations/${id}`;
    return chatsAxiosClient.get(url);
  },
  getMessages(sender_id: string, receiver_id: string) {
    const url = `messages/${sender_id}`;
    return chatsAxiosClient.get(url, { params: { receiver_id } });
  },
};
