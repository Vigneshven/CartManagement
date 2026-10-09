import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice.js"

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});