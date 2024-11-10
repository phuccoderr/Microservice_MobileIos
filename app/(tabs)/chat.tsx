import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Message } from "@/types/message.type";
import { chatSocket } from "@/api/socket";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useQueryClient } from "@tanstack/react-query";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetMessages } from "@/hooks/query-chats/useGetMessages";
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChatScreen = () => {
  const { data: me } = useGetMe();
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  const { data: messages } = useGetMessages(
    me?._id ?? "",
    COMMONS_CONST.ID_ADMIN
  );

  const listMessages = messages?.messages.map((item) => ({
    _id: item._id,
    text: item.message,
    createdAt: new Date(item.created_at),
    user: {
      _id: item.sender.id,
      name: item.sender.name,
      avatar: "",
    },
    received: item.receiver.id == COMMONS_CONST.ID_ADMIN,
  }));

  const handleChat = () => {
    if (me) {
      chatSocket.emit("send-messages", {
        sender: {
          id: me._id,
          name: me.first_name + " " + me.last_name,
          email: me.email,
        },
        receiver: {
          id: COMMONS_CONST.ID_ADMIN,
          name: COMMONS_CONST.NAME_ADMIN,
          email: COMMONS_CONST.EMAIL_ADMIN,
        },
        message: value,
      });
    }
    queryClient.refetchQueries({ queryKey: ["messages"] });
  };

  const handleSetValue = (value: string) => {
    setValue(value);
    if (me) {
      if (value != "") {
        chatSocket.emit("typing", me._id);
      } else {
        chatSocket.emit("notyping", me._id);
      }
    }
  };

  useEffect(() => {
    const refetchChat = (data: Message) => {
      if (data.receiver.id == me?._id) {
        queryClient.refetchQueries({ queryKey: ["messages"] });
        setIsTyping(false);
      }
    };
    const typingChat = (id: string) => {
      if (id == COMMONS_CONST.ID_ADMIN) {
        setIsTyping(true);
      }
    };

    const noTypingChat = (id: string) => {
      if (id == COMMONS_CONST.ID_ADMIN) {
        setIsTyping(false);
      }
    };

    chatSocket.on("receive-messages", refetchChat);
    chatSocket.on("typing", typingChat);
    chatSocket.on("notyping", noTypingChat);

    return () => {
      chatSocket.off("receive-messages", refetchChat);
      chatSocket.off("typing", typingChat);
      chatSocket.off("notyping", noTypingChat);
    };
  }, []);

  return (
    <GiftedChat
      isTyping={isTyping}
      placeholder="Nhập tin nhắn..."
      messages={(listMessages ?? []).slice().reverse()}
      inverted={true}
      onSend={() => handleChat()}
      user={{
        _id: me?._id ?? "",
      }}
      alwaysShowSend
      renderSend={(props) => (
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              size={40}
              color="#0ea5e9"
            />
          </View>
        </Send>
      )}
      scrollToBottom
      renderUsernameOnMessage
      onInputTextChanged={handleSetValue}
      renderInputToolbar={(props) => (
        <InputToolbar
          {...props}
          renderComposer={(composerProps) => (
            <Composer
              {...composerProps}
              textInputStyle={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#f0f0f0",
              }}
            />
          )}
        />
      )}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
