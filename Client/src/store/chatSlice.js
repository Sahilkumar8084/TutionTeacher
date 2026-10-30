import { createSlice } from "@reduxjs/toolkit";

const MAX_HISTORY = 10;

const chatSlice = createSlice({
  name: "chat",
  initialState: { messages: [] }, // [{ role: "user" | "assistant", content }]
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
      state.messages = state.messages.slice(-MAX_HISTORY);
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export const selectHistory = (state) => state.chat.messages;
export default chatSlice.reducer;
