import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  currentSliceComment: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
  loading: true,
};

export const commentslice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.comments = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceComment = results?.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    getSlice: (state, action) => {
      state.currentSliceComment = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.loading = false;
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceComment = state.comments.slice(
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
    // createComment: (state, action) => {},
    // updateComment: (state, action) => {},
    // deleteComment: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateComment,
  // deleteComment
  setPage,
  getWithoutFetchSlice,
  updateLoading,
} = commentslice.actions;

export default commentslice.reducer;
