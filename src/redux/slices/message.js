import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchMessageGet = createAsyncThunk(
  "message/fetchMessageGet",
  async (messageId) => {
    const { data } = await instance.get(`/message/get/${messageId._id}`);
    return data;
  }
);

export const fetchMessagePost = createAsyncThunk(
  "message/fetchMessagePost",
  async (chatId, userId, message) => {
    console.log(chatId, userId, message);
    const { data } = await instance.post(
      `/message/post/${chatId}/${userId}/${message}`
    );
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  extraReducers: {
    [fetchMessageGet.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchMessageGet.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchMessageGet.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchMessagePost.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchMessagePost.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchMessagePost.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const messageReducer = messageSlice.reducer;
