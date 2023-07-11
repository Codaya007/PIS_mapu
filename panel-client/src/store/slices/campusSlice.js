import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campuses: [],
  currentSliceCampus: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.campuses = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceCampus = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      state.currentSliceCampus = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceCampus = state.campuses.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    //Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createCampus: (state, action) => {},
    // updateCampus: (state, action) => {},
    // deleteCampus: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateCampus,
  // deleteCampus
  setPage,
  getWithoutFetchSlice,
} = campusSlice.actions;

export default campusSlice.reducer;
