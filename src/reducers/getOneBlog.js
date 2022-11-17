import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const getOneBlog = createAsyncThunk("one/blogs", async (blogId) => {
  const data  = await FetchData(`/blogs/${blogId}`, {method: 'GET'});
  return data;
});
const singleBlogSlice = createSlice({
    name: "blogDetail",
    initialState: {
      data: [],
      loading: false,
      isSuccess: false,
      message: "",
    },
    reducers: {},
    extraReducers: {
      [getOneBlog.pending]: (state, action) => {
        state.loading = true;
      },
      [getOneBlog.fulfilled]: (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.isSuccess = true;
      },
      [getOneBlog.rejected]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      },
    },
  });
  
  export default singleBlogSlice;

