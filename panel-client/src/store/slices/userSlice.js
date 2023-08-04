import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentSliceUser: [],
  pages: 1,
  currentPage: 1,
  totalCount: 0,
  skip: 0,
  limit: 6,
  fetched: false,
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action) => {
      const { results, totalCount } = action.payload;

      state.users = results;
      state.totalCount = totalCount;
      state.fetched = true;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.currentSliceUser = results?.slice(
        state.skip,
        state.skip + state.limit
      );
      state.loading = false;
    },
    getSlice: (state, action) => {
      state.currentSliceUser = action.payload.results;
      state.totalCount = action.payload.totalCount;
      state.pages = Math.ceil(state.totalCount / state.limit);
      state.loading = false;
    },
    // En base a skip y limit edita el currentSliceFaculties
    getWithoutFetchSlice: (state, action) => {
      state.currentSliceUser = state.users.slice(
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
    // createUser: (state, action) => {},
    // updateUser: (state, action) => {},
    // deleteUser: (state, action) => {},
  },
});

export const {
  getAll,
  getSlice,
  // createSlice,
  // updateUser,
  // deleteUser
  setPage,
  getWithoutFetchSlice,
  updateLoading,
} = userSlice.actions;

export default userSlice.reducer;
