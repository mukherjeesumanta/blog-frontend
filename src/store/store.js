import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "../reducers/getBlogs";
import singleBlogSlice from "../reducers/getOneBlog";
import loginLogoutSlice from "../reducers/loginLogout";

const store = configureStore({
  reducer: {
    blogs: BlogSlice.reducer,
    blogDetail: singleBlogSlice.reducer,
    userInfo: loginLogoutSlice.reducer
  },
});

export default store;

