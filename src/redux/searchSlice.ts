import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { getProductsData } from "../services/apiProducts";

export const fetchQuery = createAsyncThunk(
  "search/fetchQuery",
  async function (query: string) {
    const response = await getProductsData(query);
    return response;
  }
);

type InitialState = {
  data: [];
  status: "idle" | "pending" | "error";
  errorMessage: "noError" | string | undefined | SerializedError
};

const initialState: InitialState = {
  data: [],
  status: "idle",
  errorMessage: "noError",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchQuery.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchQuery.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchQuery.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message;
      }),
});

export default searchSlice.reducer;
