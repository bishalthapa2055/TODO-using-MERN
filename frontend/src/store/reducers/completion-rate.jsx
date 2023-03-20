import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  completionRate: [],
  rate: null,
};

export const completeSlice = createSlice({
  name: "completionRate",
  initialState,
  reducers: {
    getAllCompletionRate: (state, action) => {
      return {
        ...state,
        completionRate: action.payload.data,
      };
    },
  },
});

export const { getAllCompletionRate } = completeSlice.actions;

export default completeSlice.reducer;
