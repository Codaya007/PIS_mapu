import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blocks: [],
  currentSliceBlocks: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.blocks = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceBlocks = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      state.currentSliceBlocks = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceBlocks = state.blocks.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    // Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createBlock: (state, action) => {},
    // updateBlock: (state, action) => {},
    // deleteBlock: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  getAll,
  getSlice,
  // createBlock,
  // updateBlock,
  // deleteBlock,
  setPage,
  getWithoutFetchSlice,
} = blockSlice.actions;

export default blockSlice.reducer;
