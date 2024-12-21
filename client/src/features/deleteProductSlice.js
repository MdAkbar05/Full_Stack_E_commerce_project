// deleteProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProductBySlug = createAsyncThunk(
  "products/deleteProduct",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${slug}`
      );
      return response.data.message; // Return only the message
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Return error message
    }
  }
);

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProductBySlug.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteProductBySlug.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(deleteProductBySlug.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || action.error.message;
    });
  },
});

export default deleteProductSlice.reducer;
