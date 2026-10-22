import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../api/endpoints';

// Sync cart to Fakestore API
export const syncCartWithApi = createAsyncThunk(
  'cart/syncCartWithApi',
  async ({ userId = 1, products }, { rejectWithValue }) => {
    try {
      const payload = {
        userId,
        date: new Date().toISOString().split('T')[0],
        products: products.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };
      const data = await cartApi.addCart(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const TAX_RATE = 0.15; // 15% tax as shown in design mockup
const SHIPPING_FEE = 0.00; // Free shipping

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const totalTax = subtotal * TAX_RATE;
  const grandTotal = subtotal + SHIPPING_FEE + totalTax;

  return {
    totalItems,
    subtotal: Number(subtotal.toFixed(2)),
    shippingCharges: SHIPPING_FEE,
    totalTax: Number(totalTax.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
};

const initialState = {
  items: [
    // Pre-populate with sample items so user immediately sees populated cart matching mockup
    {
      id: 1,
      title: 'Heavy Blend Full Zip Hoody',
      price: 149.92,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      quantity: 1,
      selectedColor: '#4338CA',
      selectedSize: 'M',
    },
    {
      id: 2,
      title: "Women's Versatile Purse",
      price: 154.49,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      quantity: 1,
      selectedColor: '#B45309',
      selectedSize: 'One Size',
    },
    {
      id: 3,
      title: "Women's Black Heels",
      price: 359.49,
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      quantity: 1,
      selectedColor: '#1E293B',
      selectedSize: '38',
    },
  ],
  totalItems: 3,
  subtotal: 663.90,
  shippingCharges: 0.00,
  totalTax: 99.59,
  grandTotal: 763.49,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === (product.selectedColor || '#2563EB') &&
          item.selectedSize === (product.selectedSize || 'M')
      );

      const addQty = product.quantity || 1;

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += addQty;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: Number(product.price),
          image: product.image,
          quantity: addQty,
          selectedColor: product.selectedColor || '#2563EB',
          selectedSize: product.selectedSize || 'M',
        });
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity += 1;
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      }
    },

    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== itemId);
        }
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      }
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      }
    },

    clearCart: (state) => {
      state.items = [];
      const totals = calculateTotals([]);
      Object.assign(state, totals);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartWithApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncCartWithApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(syncCartWithApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
