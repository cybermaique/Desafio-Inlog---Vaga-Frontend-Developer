import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./truck-slice";

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
