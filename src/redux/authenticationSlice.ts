import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, logout } from "../services/apiAuthentication";


export const checkAuthentication = createAsyncThunk(
  "authentication/checkAuthentication",
  async function () {
    const authenticationResponse = await getUser();
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
  authenticated: boolean;
  user: null | object;
  status: "idle" | "pending";
  error: object | boolean;
};

const initialState: authTypes = {
  authenticated: false,
  user: null,
  status: "idle",
  error: false,
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
        state.authenticated = true;
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.authenticated = false;
        state.status = "idle";
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
        state.error = action.error;
        state.status = "idle";
      }),
});

export default authenticationSlice.reducer;
