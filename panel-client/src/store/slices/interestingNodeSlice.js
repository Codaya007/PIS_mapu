import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interestingNodes: [],
  currentSliceInterestingNodes: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const interestingNodeSlice = createSlice({
  name: "interestingNode",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.interestingNodes = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(totalCount / state.limit);
      state.currentSliceInterestingNodes = results?.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      const { results, totalCount } = action.payload;

      state.currentSliceInterestingNodes = results;
      state.totalCount = totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceInterestingNodes
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceInterestingNodes = state.interestingNodes.slice(
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
} = interestingNodeSlice.actions;

export default interestingNodeSlice.reducer;
