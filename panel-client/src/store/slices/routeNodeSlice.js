import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routeNodes: [],
  currentSliceRouteNodes: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 5,
  fetched: false,
  loading: true,
};

export const routeNodeSlice = createSlice({
  name: "routeNode",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.routeNodes = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(totalCount / state.limit);
      state.currentSliceRouteNodes = results?.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    getSlice: (state, action) => {
      const { results, totalCount } = action.payload;

      state.currentSliceRouteNodes = results;
      state.totalCount = totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.loading = false;
    },
    // En base a skip y limit edita el currentSliceRouteNodes
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceRouteNodes = state.routeNodes.slice(
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
  updateLoading,
} = routeNodeSlice.actions;

export default routeNodeSlice.reducer;
