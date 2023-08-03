import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  currentSliceEvent: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
  loading: true,
};

export const eventslice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.events = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceEvent = results?.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    getSlice: (state, action) => {
      state.currentSliceEvent = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.loading = false;
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceEvent = state.events.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    //Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload || false;
    },
    // createEvent: (state, action) => {},
    // updateEvent: (state, action) => {},
    // deleteEvent: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateEvent,
  // deleteEvent
  setPage,
  getWithoutFetchSlice,
  updateLoading,
} = eventslice.actions;

export default eventslice.reducer;
