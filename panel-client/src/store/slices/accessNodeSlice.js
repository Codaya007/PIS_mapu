import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessNodes: [],
  currentSliceAccessNodes: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const accessNodeSlice = createSlice({
  name: "accessNode",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.accessNodes = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(totalCount / state.limit);
      state.currentSliceAccessNodes = results?.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      const { results, totalCount } = action.payload;

      state.currentSliceAccessNodes = results;
      state.totalCount = totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceAccessNodes
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceAccessNodes = state.accessNodes.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    // Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createInterestNode: (state, action) => {},
    // updateInterestNode: (state, action) => {},
    // deleteInterestNode: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  getAll,
  getSlice,
  // createInterestNode,
  // updateInterestNode,
  // deleteInterestNode,
  setPage,
  getWithoutFetchSlice,
} = accessNodeSlice.actions;

export default accessNodeSlice.reducer;
