import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import homePageSlice from "../reducers/homePageSlice";
import currentChatSlice from "../reducers/currentChatSlice";
import chatSlice from "../reducers/chatSlices";

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    homePageSlice: homePageSlice.reducer,
    currentChatSlice: currentChatSlice.reducer,
    chatSlice: chatSlice.reducer,
  },
});

export default store;
