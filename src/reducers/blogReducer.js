import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/util";

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
      isEditMode: false,
      blogDetail: {
        isSuccess: false,
        loading: false
      }
    },
    reducers: {
      openEditMode(state) {
        state.isEditMode = true;
      },
      closeEditMode(state) {
        state.isEditMode = false;
      },

      updateBlogTitle(state, { payload }) {
        state.blogDetail.data.title = payload;
      },
      updateBlogContent(state, { payload }) {
        state.blogDetail.data.description = payload.content;

        const index = state.data.findIndex((blog) => blog._id === payload.blogId)
        const blogCopy = JSON.parse(JSON.stringify(state.blogDetail))
        //state.data[index] = {...state.blogDetail}
      },

      updateBlogList(state, blogId) {
        const blogItem = state.data.filter((blog) => blog._id === blogId)
        blogItem.title = state.blogDetail.data.title
        blogItem.description = state.blogDetail.data.description
      }
    },
    extraReducers: {
      [BlogThunk.pending]: (state, action) => {
        state.loading = true;
      },
      [BlogThunk.fulfilled]: (state, action, ...rest) => {
        const method = action.meta.arg.method;
        const endpoint = action.meta.arg.endpoint;
        let blogId;

        if(method === 'DELETE') {
          blogId = action.meta.arg.endpoint;
          const index = state.data.findIndex((blog) => blog._id === blogId )
          state.data.splice(index, 1);
        } else if(method === 'GET') {
          state.results = action.payload.results;
          state.status = action.payload.status;

          if(!!endpoint && !['get-my-blogs', ''].includes(endpoint) ) {
            // Get one blog details
            state.blogDetail = action.payload;
            state.blogDetail.loading = false;
            state.blogDetail.isSuccess = true;
          } else {
            // get blog list
            state.data = action.payload.data;
          }
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
  
  export const { openEditMode, closeEditMode, updateBlogTitle, updateBlogContent, updateBlogList } = BlogSlice.actions;
  export default BlogSlice;

