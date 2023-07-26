import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careers: [],
  currentSliceCareer: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.careers = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceCareer = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      state.currentSliceCareer = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceCareer = state.careers.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    //Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createCareer: (state, action) => {},
    // updateCareer: (state, action) => {},
    // deleteCareer: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateCareer,
  // deleteCareer
  setPage,
  getWithoutFetchSlice,
} = careerSlice.actions;

export default careerSlice.reducer;
