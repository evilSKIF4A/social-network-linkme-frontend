import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
// import { friendReducer } from "./slices/friend";
// import { chatReducer } from "./slices/chat";
// import { messageReducer } from "./slices/message";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // friend: friendReducer,
    // chat: chatReducer,
    // message: messageReducer,
  },
});

export default store;
