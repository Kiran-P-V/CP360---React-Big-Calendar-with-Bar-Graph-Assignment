import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice.js";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
