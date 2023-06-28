import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faculties: [],
  currentSliceFaculties: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 10,
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.faculties = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getSlice: (state, action) => {
      state.currentSliceFaculties = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    createFaculty: (state, action) => {},
    updateFaculty: (state, action) => {},
    deleteFaculty: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { getAll, getSlice, updateFaculty, deleteFaculty, setPage } =
  facultySlice.actions;

export default facultySlice.reducer;
