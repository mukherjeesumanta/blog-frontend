import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiState",
  initialState: {
    mobileNavBarVisible: false
  },
  reducers: {
    showMobileNav(state, { payload }) {
        state.mobileNavBarVisible = payload;
    }
  },
  extraReducers: {}
});

export const {
    showMobileNav
} = uiSlice.actions;

export default uiSlice;

