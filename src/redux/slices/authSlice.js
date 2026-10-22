import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, userApi } from '../../api/endpoints';

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(username, password);
      // Return user info along with received token
      return {
        token: data.token,
        username: username,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed. Please check credentials.');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await userApi.addUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed.');
    }
  }
);

const initialState = {
  token: null,
  user: {
    id: 1,
    name: 'Afifa Naeem',
    email: 'afifa.naeem@example.com',
    username: 'johnd',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  isAuthenticated: false,
  isOnboarded: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Quick login for demo or test accounts
    loginDirect: (state, action) => {
      state.isAuthenticated = true;
      state.token = 'demo-token-12345';
      if (action.payload) {
        state.user = { ...state.user, ...action.payload };
      }
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    setOnboarded: (state, action) => {
      state.isOnboarded = action.payload ?? true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user.username = action.payload.username;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { loginDirect, logout, setOnboarded, clearAuthError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
