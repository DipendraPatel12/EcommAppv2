import apiClient from './client';

export const productApi = {
  // Get all products
  getAllProducts: async (limit = 20, sort = 'desc') => {
    const response = await apiClient.get('/products', {
      params: { limit, sort },
    });
    return response.data;
  },

  // Get single product
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Get product categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Get products by specific category
  getProductsByCategory: async (category) => {
    const response = await apiClient.get(`/products/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  // Add new product
  addProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

export const cartApi = {
  // Get all carts
  getAllCarts: async () => {
    const response = await apiClient.get('/carts');
    return response.data;
  },

  // Get single cart by cart id
  getCartById: async (id) => {
    const response = await apiClient.get(`/carts/${id}`);
    return response.data;
  },

  // Get user carts by userId
  getUserCart: async (userId) => {
    const response = await apiClient.get(`/carts/user/${userId}`);
    return response.data;
  },

  // Add new cart
  addCart: async (cartData) => {
    const response = await apiClient.post('/carts', cartData);
    return response.data;
  },

  // Update cart
  updateCart: async (id, cartData) => {
    const response = await apiClient.put(`/carts/${id}`, cartData);
    return response.data;
  },

  // Delete cart
  deleteCart: async (id) => {
    const response = await apiClient.delete(`/carts/${id}`);
    return response.data;
  },
};

export const userApi = {
  // Get all users
  getAllUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Get single user by ID
  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Register / create new user
  addUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

export const authApi = {
  // Authenticate user
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
};
