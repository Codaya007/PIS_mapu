import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faculties: [],
  currentSliceFaculties: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
  loading: true,
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.faculties = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceFaculties = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    getSlice: (state, action) => {
      state.currentSliceFaculties = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.loading = false;
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceFaculties = state.faculties.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    // Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload || false;
    },
    // createFaculty: (state, action) => {},
    // updateFaculty: (state, action) => {},
    // deleteFaculty: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  getAll,
  getSlice,
  // createFaculty,
  // updateFaculty,
  // deleteFaculty,
  setPage,
  getWithoutFetchSlice,
  updateLoading,
} = facultySlice.actions;

export default facultySlice.reducer;
