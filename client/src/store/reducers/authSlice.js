import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user auth",
  initialState: { authStatus: false },
  reducers: {
    authUser: (state, action) => {
      Object.assign(state, action.payload);
      state.authStatus = true;
    },
    clearAuth: () => {
      return { authStatus: false };
    },
  },
});

export default authSlice;
export const { authUser, clearAuth } = authSlice.actions;
