import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "user's chats / Rooms",
  initialState: { chats: [] },
  reducers: {
    setChats: (state, action) => {
      // We will reciever members that hold the chat and here i am forming the chat array
      const usersChatArray = action.payload.map((member) => {
        const actualChat = member.chat;
        const chatId = actualChat.id;
        const isGroup = actualChat.isGroup;

        const chatImage = isGroup
          ? actualChat.groupImage
          : actualChat.members[0].user.image;

        const chatName = isGroup
          ? actualChat.groupImage
          : actualChat.members[0].user.name;

        const latestMessage = actualChat.messages[0];
        const latestMessageBody = latestMessage.body;
        const latestMessageSender = latestMessage.sender.name;

        return {
          id: chatId,
          chatImage,
          chatName,
          latestMessageBody,
          latestMessageSender,
        };
      });

      state.chats = usersChatArray;
    },
    updateChatsWithLatestMessage: (state, action) => {
      const userChatArray = state.chats.map((chat) => {
        if (chat.id === action.payload.chat.id) {
          return {
            ...chat,
            latestMessageBody: action.payload.body,
            latestMessageSender: action.payload.sender.name,
          };
        }

        return chat;
      });

      state.chats = userChatArray;
    },
  },
});

export default chatSlice;
export const { setChats, updateChatsWithLatestMessage } = chatSlice.actions;
