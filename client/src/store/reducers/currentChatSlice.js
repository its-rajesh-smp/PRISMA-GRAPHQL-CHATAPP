import { createSlice } from "@reduxjs/toolkit";
const currentChatSlice = createSlice({
  name: "current chat",
  initialState: {
    chatId: null,
    messages: [],
  },
  reducers: {
    addNewChatMessage: (state, actions) => {
      state.messages.push(actions.payload);
    },
    setCurrentChatMessages: (state, actions) => {
      state.messages = actions.payload;
    },
    setCurrentChat: (state, actions) => {
      state.chatId = actions.payload;
    },
    clearCurrentChat: (state) => {
      state.chatId = null;
      state.messages = [];
    },
  },
});

export default currentChatSlice;
export const {
  setCurrentChat,
  clearCurrentChat,
  setCurrentChatMessages,
  addNewChatMessage,
} = currentChatSlice.actions;
