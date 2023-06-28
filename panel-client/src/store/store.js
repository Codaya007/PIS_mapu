import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import campusReducer from "./slices/campusSlice";

export const store = configureStore({
  reducer: { campusReducer, authReducer },
});
