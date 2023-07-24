import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currentSliceCategory: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.categories = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceCategory = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      state.currentSliceCategory = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceCategory = state.categories.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    //Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createCategory: (state, action) => {},
    // updateCategory: (state, action) => {},
    // deleteCategory: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateCategory,
  // deleteCategory
  setPage,
  getWithoutFetchSlice,
} = categorySlice.actions;

export default categorySlice.reducer;
