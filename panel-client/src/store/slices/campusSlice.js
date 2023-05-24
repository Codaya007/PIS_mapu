import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campus: [],
  loading: false,
};

export const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    getAll: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.campus = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload ?? false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAll, setLoading } = campusSlice.actions;

export default campusSlice.reducer;
