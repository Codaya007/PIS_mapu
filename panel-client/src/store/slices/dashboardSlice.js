import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalUser: 10,
    totalUserLastMonth: 1,
    totalCampus: 1,
    totalFaculty: 1,
    totalBlock: 1,
    totalCareer: 1,
    totalCategory: 1,
    totalSector: 1
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
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getAll,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
