import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  path: null,
  steps: null,
  resultMessage: null,
  resultAccessNode: null,
  totalDistance: 0,
  searchText: "",
  searchTextResults: null,
  searchPathBy: "byNode",
  nomenclature: {
    campus: "",
    block: "",
    floor: "",
    environment: "",
  },
  currentNode: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
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
      state.searchTextResults = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchTextResults = action.payload;
    },
    restartSearch: (state, action) => {
      state.origin = null;
      state.destination = null;
      state.path = null;
      state.steps = null;
      state.resultMessage = null;
      state.resultAccessNode = null;
      state.totalDistance = 0;
    },
    setSearchType: (state, action) => {
      state.searchPathBy = action.payload;
    },
    setNomenclature: (state, action) => {
      const { campus, block, floor, environment } = action.payload;

      state.nomenclature.campus = campus || "";
      state.nomenclature.block = block || "";
      state.nomenclature.floor = floor || "";
      state.nomenclature.environment = environment || "";
    },
    setCurrentNode: (state, action) => {
      state.currentNode = action.payload;
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
  setSearchType,
  setNomenclature,
  setCurrentNode,
  setSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
