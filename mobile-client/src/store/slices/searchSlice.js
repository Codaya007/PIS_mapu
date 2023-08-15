import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Adicionales
  onSearchProcess: false,
  currentNode: null,
  origin: null,
  destination: null,
  // Resultados de la ruta
  path: null,
  steps: null,
  resultMessage: null,
  resultAccessNode: null,
  totalDistance: 0,
  errorOnPathSearch: null,
  loadingSearch: false,
  // Buscador de texto
  searchText: "",
  searchTextResults: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;

      state.path = null;
      state.steps = null;
      state.resultMessage = null;
      state.resultAccessNode = null;
      state.totalDistance = 0;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;

      state.path = null;
      state.steps = null;
      state.resultMessage = null;
      state.resultAccessNode = null;
      state.totalDistance = 0;
    },
    setPath: (state, action) => {
      const {
        additionalMessage,
        additionalNode,
        result = {},
      } = action.payload || {};
      const { totalDistance, path, steps = [] } = result;

      state.path = path;
      state.steps = steps;
      state.totalDistance = totalDistance;
      state.additionalMessage = additionalMessage;
      state.resultAccessNode = additionalNode;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    searchText: (state, action) => {
      state.searchTextResults = action.payload?.results;
    },
    setSearchResults: (state, action) => {
      state.searchTextResults = action.payload;
    },
    restartSearch: (state, action) => {
      // state.origin = null;
      // state.destination = null;
      state.path = null;
      state.steps = null;
      state.resultMessage = null;
      state.resultAccessNode = null;
      state.totalDistance = 0;
    },
    setCurrentNode: (state, action) => {
      state.currentNode = action.payload;
    },
    setError: (state, action) => {
      state.errorOnPathSearch = action.payload;
    },
    clearError: (state) => {
      state.errorOnPathSearch = null;
    },
    setOnSearchProcess: (state, action) => {
      state.onSearchProcess = action.payload || false;
    },
    setLoadingSearch: (state, action) => {
      state.loadingSearch = action.payload || false;
    },
    restoreRouteSearch: (state, action) => {
      state.path = null;
      state.steps = null;
      state.totalDistance = 0;
      state.additionalMessage = null;
      state.resultAccessNode = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrigin,
  setDestination,
  setPath,
  setSearchText,
  searchText,
  restartSearch,
  setCurrentNode,
  setSearchResults,
  clearError,
  setError,
  setOnSearchProcess,
  setLoadingSearch,
  restoreRouteSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
