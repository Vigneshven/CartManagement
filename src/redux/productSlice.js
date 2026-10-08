import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  productPrice: "",
  productImage: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload;
    },

    setProductPrice: (state, action) => {
      state.productPrice = action.payload;
    },

    setProductImage: (state, action) => {
      state.productImage = action.payload;
    },

    resetProductForm: (state) => {
      state.productName = "";
      state.productPrice = "";
      state.productImage = "";
    },
  },
});

export const {
  setProductName,
  setProductPrice,
  setProductImage,
  resetProductForm,
} = productSlice.actions;

export default productSlice.reducer;