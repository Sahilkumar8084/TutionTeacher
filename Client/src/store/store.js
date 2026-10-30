import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";
import playerReducer from "./playerSlice.js";
import chatReducer from "./chatSlice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    player: playerReducer,
    chat: chatReducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});
