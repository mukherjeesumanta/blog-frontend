import { configureStore } from '@reduxjs/toolkit'

import BlogSlice from '../reducers/blogReducer'
import authSlice from '../reducers/auth'


export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
        blogs: BlogSlice.reducer,
        userInfo: authSlice.reducer
    },
    preloadedState
  })
}

