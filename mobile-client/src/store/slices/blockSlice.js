import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blocks: null,
  totalCount: null,
};

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    getAllBlocks: (state, action) => {
      state.blocks = action.payload.results;
      state.totalCount = action.payload.totalCount;
    },
  },
});

export const { getAllBlocks } = blockSlice.actions;

export default blockSlice.reducer;
