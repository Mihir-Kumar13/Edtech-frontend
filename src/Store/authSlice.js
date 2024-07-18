import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userprofile: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },

    addUserProfile: (state, action) => {
      state.userprofile = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
      state.userprofile = null;
    },
  },
});

export default authSlice.reducer;

export const { addUser, addUserProfile, removeUser } = authSlice.actions;
