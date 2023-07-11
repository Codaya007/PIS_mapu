import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import facultyReducer from "./slices/facultySlice";
import campusReducer from "./slices/campusSlice";

export const store = configureStore({
  reducer: { authReducer, facultyReducer, campusReducer },
});
