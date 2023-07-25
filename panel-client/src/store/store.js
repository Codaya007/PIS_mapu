import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import facultyReducer from "./slices/facultySlice";
import campusReducer from "./slices/campusSlice";
import dashboardReducer from "./slices/dashboardSlice";
import blockReducer from "./slices/blockSlice";
import categoryReducer from "./slices/categorySlice";
import careerReducer from "./slices/careerSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    facultyReducer,
    campusReducer,
    blockReducer,
    dashboardReducer,
    categoryReducer,
    careerReducer,
    userReducer,
    commentReducer,
    eventReducer,
  },
});
