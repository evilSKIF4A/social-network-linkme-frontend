import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchChat = createAsyncThunk("chat/fetchChat", async (params) => {
  const { data } = await instance.get(`/chats/${params}`);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: {
    [fetchChat.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchChat.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchChat.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const chatReducer = chatSlice.reducer;
