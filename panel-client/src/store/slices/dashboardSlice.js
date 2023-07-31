import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUser: null,
  totalUserLastMonth: null,
  totalCampus: null,
  totalFaculty: null,
  totalBlock: null,
  totalCareer: null,
  totalCategory: null,
  totalSector: null,
  totalEvents: null,
  totalRouteNodes: null,
  totalInterestingNodes: null,
  totalAccessNodes: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.totalUser = action.payload.totalUser;
      state.totalUserLastMonth = action.payload.totalUserLastMonth;
      state.totalCampus = action.payload.totalCampus;
      state.totalFaculty = action.payload.totalFaculty;
      state.totalBlock = action.payload.totalBlock;
      state.totalCareer = action.payload.totalCareer;
      state.totalCategory = action.payload.totalCategory;
      state.totalSector = action.payload.totalSector;
      state.totalEvents = action.payload.totalEvents;
      state.totalInterestingNodes = action.payload.totalInterestingNodes;
      state.totalRouteNodes = action.payload.totalRouteNodes;
      state.totalAccessNodes = action.payload.totalAccessNodes;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAll } = dashboardSlice.actions;

export default dashboardSlice.reducer;
