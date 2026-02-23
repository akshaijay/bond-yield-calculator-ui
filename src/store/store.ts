import { configureStore } from "@reduxjs/toolkit";
import bondReducer from "./bondSlice";

export const store = configureStore({
  reducer: {
    bond: bondReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

