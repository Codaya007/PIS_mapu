import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [],
  currentSliceReports: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.reports = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceReports = action.payload.results.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    getSlice: (state, action) => {
      state.currentSliceReports = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceReports
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceReports = state.reports.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    // Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    // createReport: (state, action) => {},
    // updateReport: (state, action) => {},
    // deleteReport: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  getAll,
  getSlice,
  // createReport,
  // updateReport,
  // deleteReport,
  setPage,
  getWithoutFetchSlice,
} = reportSlice.actions;

export default reportSlice.reducer;
