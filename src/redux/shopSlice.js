import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addCartItem as addCartItemApi,
  createProduct,
  deleteCartItem,
  getCart,
  getProducts,
  updateCartItems,
} from "../services/api";

const initialState = {
  products: [],
  cart: [],
  showAddProduct: false,
  productSelections: {},
};

export const loadShopData = createAsyncThunk("shop/loadShopData", async () => {
  const [products, cart] = await Promise.all([getProducts(), getCart()]);
  return { products, cart };
});

export const createProductAsync = createAsyncThunk(
  "shop/createProduct",
  async (product) => createProduct(product),
);

export const addProductToCart = createAsyncThunk(
  "shop/addProductToCart",
  async ({ product, quantity, selectedDiscount }, { getState }) => {
    const discount = Number(selectedDiscount ?? 0);
    const existingItem = getState().shop.cart.find(
      (item) =>
        String(item.productId) === String(product.id) &&
        Number(item.selectedDiscount ?? 0) === discount,
    );
    const price =
      Number(product.price) - (Number(product.price) * discount) / 100;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        price,
        selectedDiscount: discount,
        quantity: existingItem.quantity + quantity,
      };

      return {
        type: "updated",
        item: await updateCartItems(existingItem.id, updatedItem),
      };
    }

    return {
      type: "added",
      item: await addCartItemApi({
        productId: product.id,
        name: product.name,
        price,
        selectedDiscount: discount,
        image: product.image,
        quantity,
      }),
    };
  },
);

export const removeCartItemAsync = createAsyncThunk(
  "shop/removeCartItem",
  async (cartId) => {
    await deleteCartItem(cartId);
    return cartId;
  },
);

export const checkoutCart = createAsyncThunk(
  "shop/checkoutCart",
  async (_, { getState }) => {
    await Promise.all(
      getState().shop.cart.map((item) => deleteCartItem(item.id)),
    );
  },
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShowAddProduct: (state, action) => {
      state.showAddProduct = action.payload;
    },

    setProductSelection: (state, action) => {
      const { productId, field, value } = action.payload;
      state.productSelections[productId] = {
        quantity: 1,
        selectedDiscount: 0,
        ...state.productSelections[productId],
        [field]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadShopData.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.cart = action.payload.cart;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const { type, item } = action.payload;
        if (type === "updated") {
          const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
          if (index !== -1) state.cart[index] = item;
        } else {
          state.cart.push(item);
        }
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export const { setShowAddProduct, setProductSelection } = shopSlice.actions;

export default shopSlice.reducer;
