import { createSlice } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;

      // localStorage.setItem("user", JSON.stringify(action.payload?.user));
      // localStorage.setItem("token", JSON.stringify(action.payload?.token));
    },
    getProfile: (state, action) => {
      state.user = action.payload;
      // localStorage.setItem("user", JSON.stringify(action?.payload));
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
      // localStorage.setItem("user", JSON.stringify(action?.payload));
    },
    logout: (state, action) => {
      state.user = null;
      // state.token = null;

      // localStorage.removeItem("user");
      // localStorage.removeItem("token")
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, getProfile, updateProfile, logout } = authSlice.actions;

export default authSlice.reducer;
