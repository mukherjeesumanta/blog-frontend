import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "../reducers/blogReducer";
import authSlice from "../reducers/auth";
import uiSlice from "../reducers/uiReducer";

const store = configureStore({
  reducer: {
    blogs: BlogSlice.reducer,
    userInfo: authSlice.reducer,
    uiStates: uiSlice.reducer
  }
});

export default store;

