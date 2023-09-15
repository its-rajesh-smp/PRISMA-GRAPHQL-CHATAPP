import { createSlice } from "@reduxjs/toolkit";
const homePageSlice = createSlice({
  name: "home slice",
  initialState: {
    inviteUserForm: false,
  },
  reducers: {
    showInviteUserForm: (state) => {
      state.inviteUserForm = !state.inviteUserForm;
    },
  },
});

export default homePageSlice;
export const { showInviteUserForm } = homePageSlice.actions;
