import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Pre-fill with a few items to match the user's "My Favourites (15 products)" mockup
  items: [
    {
      id: 1,
      title: 'Men Long Windproof Jacket',
      price: 349.99,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      category: "men's clothing",
      rating: { rate: 4.8, count: 120 },
    },
    {
      id: 2,
      title: "Men's Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      category: "men's clothing",
      rating: { rate: 4.1, count: 259 },
    },
    {
      id: 3,
      title: "Women's Scrub Jacket...",
      price: 329.99,
      image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
      category: "women's clothing",
      rating: { rate: 4.7, count: 130 },
    },
    {
      id: 4,
      title: "Women's Versatile Purse",
      price: 154.49,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      category: "women's clothing",
      rating: { rate: 4.5, count: 90 },
    },
  ],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    },
    addToFavorites: (state, action) => {
      const product = action.payload;
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
