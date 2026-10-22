import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api/endpoints';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productApi.getAllProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productApi.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load categories');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await productApi.getProductById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load product details');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      if (category === 'All') {
        const data = await productApi.getAllProducts();
        return { category, products: data };
      }
      const data = await productApi.getProductsByCategory(category);
      return { category, products: data };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load category products');
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  categories: ['All', "men's clothing", "women's clothing", 'jewelery', 'electronics'],
  selectedCategory: 'All',
  searchQuery: '',
  currentProduct: null,
  isLoading: false,
  isDetailsLoading: false,
  error: null,
};

const filterList = (products, category, query) => {
  let list = [...products];
  if (category && category !== 'All') {
    list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
  }
  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }
  return list;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterList(state.products, state.selectedCategory, state.searchQuery);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = filterList(state.products, state.selectedCategory, state.searchQuery);
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredProducts = filterList(state.products, state.selectedCategory, '');
    },
  },
  extraReducers: (builder) => {
    // All Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.filteredProducts = filterList(action.payload, state.selectedCategory, state.searchQuery);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Keep 'All' as the first category
      const unique = ['All', ...action.payload.filter((cat) => cat !== 'All')];
      state.categories = unique;
    });

    // Product By ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isDetailsLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isDetailsLoading = false;
        state.error = action.payload;
      });

    // Products By Category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCategory = action.payload.category;
        state.filteredProducts = filterList(action.payload.products, action.payload.category, state.searchQuery);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory, setSearchQuery, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
