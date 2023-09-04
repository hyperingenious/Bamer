import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsData } from "../services/apiProducts";

export const fetchQuery = createAsyncThunk(
  "search/fetchQuery",
  async function (query: string) {
    const response = await getProductsData(query);
    return response;
  }
);


const initialState = {
  data: [],
  status: "idle",
  errorMessage :''
} 

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchQuery.pending, (state)=> {
      state.status = "pending";
    }).addCase(fetchQuery.fulfilled, (state, action)=>{
        state.status = 'idle'
        state.data = [...state.data, ...action.payload]
    }).addCase(fetchQuery.rejected, (state, action)=>{
      state.status = 'error'
      state.errorMessage = action.payload
    })
});
