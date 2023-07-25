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
    },
    getSlice: (state, action) => {
      state.currentSliceEvent = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceEvent = state.events.slice(
        state.skip,
        state.skip + state.limit
      );
    },
    //Cambia currentPage y skip
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (state.currentPage - 1) * state.limit;
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
} = eventslice.actions;

export default eventslice.reducer;
