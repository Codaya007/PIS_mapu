import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campuses: null,
  totalCount: null,
};

export const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    getAllCampuses: (state, action) => {
      state.campuses = action.payload.results;
      state.totalCount = action.payload.totalCount;
    },
  },
});

export const { getAllCampuses } = campusSlice.actions;

export default campusSlice.reducer;
