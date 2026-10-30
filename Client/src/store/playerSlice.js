import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";
const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentStep: 0,   // abhi jo step dikh raha hai (0-based)
    totalSteps: 0,
    isPlaying: false, // Play all chal raha hai?
    voiceOn: false,
  },
  reducers: {
    next(state) {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      } else {
        state.isPlaying = false; // aakhri step ke baad ruk jao
      }
    },
    play(state) {
      if (state.currentStep >= state.totalSteps - 1) state.currentStep = 0;
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    reset(state) {
      state.currentStep = 0;
      state.isPlaying = false;
    },
    toggleVoice(state) {
      state.voiceOn = !state.voiceOn;
    },
  },
  extraReducers: (builder) => {
    // naya board aate hi player shuru se
    builder.addMatcher(
      apiSlice.endpoints.explain.matchFulfilled,
      (state, action) => {
        state.totalSteps = action.payload.steps.length;
        state.currentStep = 0;
        state.isPlaying = false;
      }
    );
  },
});

export const { next, play, pause, reset, toggleVoice } = playerSlice.actions;

export const selectPlayer = (state) => state.player;
export const selectIsLastStep = (state) =>
  state.player.currentStep >= state.player.totalSteps - 1;

export default playerSlice.reducer;