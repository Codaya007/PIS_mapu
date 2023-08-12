import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import campusReducer from "./slices/campusSlice";
import blockReducer from "./slices/blockSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    searchReducer,
    campusReducer,
    blockReducer,
  },
});
