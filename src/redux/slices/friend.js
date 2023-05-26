import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchFriend = createAsyncThunk(
  "users/fetchFriend",
  async (params) => {
    const { data } = await instance.get(`/users/${params}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  extraReducers: {
    [fetchFriend.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchFriend.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchFriend.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const friendReducer = friendSlice.reducer;
