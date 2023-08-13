import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: null,
  currentNode: null,
  totalCount: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getAllComments: (state, action) => {
      state.comments = action.payload.results;
      state.totalCount = action.payload.totalCount;
    },
    setCommentCurrentNode: (state, action) => {
      state.currentNode = action.payload;
    },
  },
});

export const { getAllComments, setCommentCurrentNode } = commentSlice.actions;

export default commentSlice.reducer;
