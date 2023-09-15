import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, logout } from "../services/apiAuthentication";

export const checkAuthentication = createAsyncThunk(
  "authentication/checkAuthentication",
  async function () {
    const authenticationResponse = await getUser();
    console.log("Hey");
    console.log(authenticationResponse);

    return authenticationResponse;
  }
);

export const logoutUser = createAsyncThunk(
  "authentication/logoutUser",
  async function () {
    const logoutResponse = await logout();
    return logoutResponse;
  }
);

type authTypes = {
  authenticated: boolean | string;
  user: null | object;
  status: "idle" | "pending" | "error";
  error: object;
};

const initialState: authTypes = {
  authenticated: "",
  user: null,
  status: "idle",
  error: {},
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(checkAuthentication.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.authenticated = true;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.authenticated = false;
        state.status = "error";
        state.user = {};
        state.error = action.error;
        console.error(action.error.stack);
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.authenticated = false;
        state.user = {};
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
        console.log(action.error.stack);
      }),
});

export default authenticationSlice.reducer;
