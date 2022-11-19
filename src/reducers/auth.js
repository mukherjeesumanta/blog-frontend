import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const auth = createAsyncThunk("user/login/logout", async (obj) => {
  const options = {
    method: ['login', 'signup'].includes(obj.action) ? 'POST' : 'GET'
  };
  if(['login', 'signup'].includes(obj.action) && !!obj.userData) {
    options.body = { ...obj.userData }
  };
  //debugger;
  const data  = await FetchData(`/users/${obj.action}`, options);
  
  return data;
});
const authSlice = createSlice({
    name: "userInfo",
    initialState: {
      loading: false,
      isSuccess: false,
      message: "",
      loggedIn: JSON.parse(sessionStorage.getItem("loggedIn")) || false
    },
    reducers: {},
    extraReducers: {
      [auth.pending]: (state, action) => {
        state.loading = true;
      },
      [auth.fulfilled]: (state, action) => {
        const endpoint = action.meta.arg.action;

        state.loading = false;
        state.status = action.payload.status;
        state.isSuccess = true;
        //console.log('userdata--', state, action)

        if(['login', 'signup'].includes(endpoint)) {
          state.loggedIn = true;
          sessionStorage.setItem("data", JSON.stringify(action.payload.data));
          sessionStorage.setItem("authToken", action.payload.token);
          sessionStorage.setItem("loggedIn", true);
        } else {
          state.loggedIn = false;
          sessionStorage.removeItem("data");
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("loggedIn");
        }

        //window.location.reload()
      },
      [auth.rejected]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      },
    },
  });
  
  export default authSlice;

