import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../services/apiAuthentication";

export const fetchAuthentication = createAsyncThunk(
  "authentication/fetchAuthentication",
  async function () {
    
    const authenticationResponse = await getUser();    
    console.log('Hey');
    return authenticationResponse;
  }
);

type authTypes = {
  authenticated: boolean | string;
  user: null | object;
  status: "idle" | "pending";
};

const initialState: authTypes = {
  authenticated: "",
  user: null,
  status: "idle",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAuthentication.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAuthentication.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.authenticated = true;
      })
      .addCase(fetchAuthentication.rejected, (state, action) => {
        state.authenticated = false;
        state.status = "idle";
        state.user = {};
        console.error(action.error.stack);
        
      }),
});

export default authenticationSlice.reducer;
