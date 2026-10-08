import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice.js";
import shopReducer from "./shopSlice.js"

export const store = configureStore({
  reducer: {
    product: productReducer,
    shop: shopReducer,
  },
});