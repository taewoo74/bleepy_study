import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startDate: <Date>(new Date()),
    endDate: <Date>(new Date())
}

const insightSlice = createSlice({
    name:'insight',
    initialState,
    reducers: {
        setInsight(state,action) {
            // state.Dau = action.payload.Dau;
            // state.endDate = action.payload.endDate;
        }
    },
})

export const { setInsight } = insightSlice.actions;
export const selectInsight = (state: { insight: any; }) => state.insight;

export default insightSlice