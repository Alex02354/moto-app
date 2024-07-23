// wishlistSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wishlistsItems: [],
  status: "idle",
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  "wishlists/fetchWishlist",
  async () => {
    const response = await axios.get("/api/wishlist");
    return response.data;
  }
);

export const addToWishList = createAsyncThunk(
  "wishlists/addToWishList",
  async (item) => {
    const response = await axios.post("/api/wishlist", item);
    return response.data;
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlists/removeWishlist",
  async (item) => {
    await axios.delete(`/api/wishlist/${item._id}`);
    return item._id;
  }
);

export const clearWishlists = createAsyncThunk(
  "wishlists/clearWishlists",
  async () => {
    await axios.delete("/api/wishlist");
  }
);

const wishlistsSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlistsItems = action.payload;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.wishlistsItems.push(action.payload);
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.wishlistsItems = state.wishlistsItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(clearWishlists.fulfilled, (state) => {
        state.wishlistsItems = [];
      });
  },
});

export default wishlistsSlice.reducer;
