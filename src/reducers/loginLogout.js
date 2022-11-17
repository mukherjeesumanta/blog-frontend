import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const loginLogout = createAsyncThunk("user/login/logout", async (obj) => {
  const options = {
    method: obj.action === 'login' ? 'POST' : 'GET'
  };
  if(obj.action === 'login' && !!obj.userData) {
    options.body = { ...obj.userData }
  };
  //debugger;
  const data  = await FetchData(`/users/${obj.action}`, options);
  
  return data;
});
const loginLogoutSlice = createSlice({
    name: "userInfo",
    initialState: {
      loading: false,
      isSuccess: false,
      message: ""
    },
    reducers: {},
    extraReducers: {
      [loginLogout.pending]: (state, action) => {
        state.loading = true;
      },
      [loginLogout.fulfilled]: (state, action) => {
        const endpoint = action.meta.arg.action;

        state.loading = false;
        state.status = action.payload.status;
        state.isSuccess = true;
        //console.log('userdata--', state, action)

        if(endpoint === 'login') {
          state.loggedIn = true;
          sessionStorage.setItem("data", JSON.stringify(action.payload.data));
          sessionStorage.setItem("authToken", action.payload.token);
        } else {
          state.loggedIn = false;
          sessionStorage.removeItem("data");
          sessionStorage.removeItem("authToken");
        }
        
        
        //window.location.reload()
      },
      [loginLogout.rejected]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      },
    },
  });
  
  export default loginLogoutSlice;

