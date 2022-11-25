import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/util";

export const BlogThunk = createAsyncThunk("all/blogs", async ({ endpoint, method, body }) => {
  const data = await FetchData(`/blogs/${endpoint}`, { method: method || 'GET', body });
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
    isCreateMode: false,
    blogDetail: {
      data: {},
      isSuccess: false,
      loading: false,
      message: ""
    },
    newBlog: {
      data: {},
      isSuccess: false,
      loading: false,
      message: ""
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
      state.blogDetail.data.description = payload;
    },

    openCreateMode(state) {
      state.isCreateMode = true
    },
    closeCreateMode(state) {
      state.isCreateMode = false
    },
    updateNewBlogTitle(state, { payload }) {
      state.newBlog.data.title = payload;
    },
    updateNewBlogContent(state, { payload }) {
      state.newBlog.data.description = payload;
    },
    resetNewBlogAfterSave(state, _) {
      state.newBlog = {
        data: {},
        isSuccess: false,
        loading: false,
        message: "",
        description: ""
      }
    },
    appendToBlogList(state, { payload }) {
      state.data.push(payload)
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

      if (method === 'DELETE') {
        blogId = action.meta.arg.endpoint;
        const index = state.data.findIndex((blog) => blog._id === blogId)
        state.data.splice(index, 1);
      } else if (method === 'GET') {
        state.results = action.payload.results;
        state.status = action.payload.status;

        if (!!endpoint && !['get-my-blogs', ''].includes(endpoint)) {
          // Get one blog details
          state.blogDetail = action.payload;
          state.blogDetail.loading = false;
          state.blogDetail.isSuccess = true;
        } else {
          // get blog list
          state.data = action.payload.data;
        }
      } else if (method === 'PATCH') {
        // edit blog
        state.blogDetail.data = { ...action.payload.data }
        state.blogDetail.status = action.payload.status
        state.blogDetail.loading = false;
        state.blogDetail.isSuccess = true;
      } else if (method === 'POST') {
        // create blog
        state.newBlog.data = { ...action.payload.data }
        state.newBlog.status = action.payload.status
        state.newBlog.loading = false;
        state.newBlog.isSuccess = true;
        
      }
      state.loading = false;
      state.isSuccess = true;
    },
    [BlogThunk.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export const {
  openEditMode,
  closeEditMode,
  openCreateMode,
  closeCreateMode,
  updateBlogTitle,
  updateBlogContent,
  updateNewBlogTitle,
  updateNewBlogContent,
  resetNewBlogAfterSave,
  appendToBlogList
} = BlogSlice.actions;

export default BlogSlice;

