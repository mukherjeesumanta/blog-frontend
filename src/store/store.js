import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "../reducers/blogReducer";
import authSlice from "../reducers/auth";
//import signupSlice from "../reducers/signup";

const store = configureStore({
  reducer: {
    blogs: BlogSlice.reducer,
    userInfo: authSlice.reducer
  }
});

export default store;

