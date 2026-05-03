import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  wishlist: [],
  recentlyViewed: [],
  appliedCoupon: null,
};

export const amacificSlice = createSlice({
  name: "amacific",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
      state.appliedCoupon = null;
    },
    toggleWishlist: (state, action) => {
      const id = action.payload._id;
      const idx = state.wishlist.findIndex((w) => w._id === id);
      if (idx >= 0) state.wishlist.splice(idx, 1);
      else state.wishlist.push(action.payload);
    },
    addRecentlyViewed: (state, action) => {
      const id = action.payload._id;
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter((p) => p._id !== id),
      ].slice(0, 12);
    },
    setCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
    },
    clearCoupon: (state) => {
      state.appliedCoupon = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleWishlist,
  addRecentlyViewed,
  setCoupon,
  clearCoupon,
} = amacificSlice.actions;
export default amacificSlice.reducer;
