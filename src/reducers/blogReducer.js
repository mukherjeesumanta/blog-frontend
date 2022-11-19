import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const BlogThunk = createAsyncThunk("all/blogs", async ({endpoint, method, body}) => {
  const data  = await FetchData(`/blogs/${endpoint}`, { method : method || 'GET', body });
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
      [BlogThunk.pending]: (state, action) => {
        state.loading = true;
      },
      [BlogThunk.fulfilled]: (state, action, ...rest) => {
        const method = action.meta.arg.method;
        let blogId;

        if(method === 'DELETE') {
          blogId = action.meta.arg.endpoint;
          const index = state.data.findIndex((blog) => blog._id === blogId )
          state.data.splice(index, 1);
        } else {
          state.results = action.payload.results;
          state.data = action.payload.data;
          state.status = action.payload.status;
        }
        state.loading = false;
        state.isSuccess = true;
      },
      [BlogThunk.rejected]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      },
    },
  });
  
  export default BlogSlice;

