import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const GetBlogs = createAsyncThunk("all/blogs", async () => {
  const data  = await FetchData(`/blogs/`, {method: 'GET'});
  return data;
});
const BlogSlice = createSlice({
    name: "blogs",
    initialState: {
      data: [],
      loading: false,
      isSuccess: false,
      message: "",
    },
    reducers: {},
    extraReducers: {
      [GetBlogs.pending]: (state, action) => {
        state.loading = true;
      },
      [GetBlogs.fulfilled]: (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.results = action.payload.results;
        state.data = action.payload.data;
        state.isSuccess = true;
      },
      [GetBlogs.rejected]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      },
    },
  });
  
  export default BlogSlice;

