import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url, error.message);
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - is the backend running?');
    } else if (error.code === 'NETWORK_ERROR') {
      console.error('Network error - check your connection');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Books
  getBooks: (params = {}) => apiClient.get('/books/', { params }),
  getBook: (id) => apiClient.get(`/books/${id}`),
  createBook: (data) => apiClient.post('/books/', data),
  updateBook: (id, data) => apiClient.put(`/books/${id}`, data),
  deleteBook: (id) => apiClient.delete(`/books/${id}`),
  updateBookStock: (id, quantityChange) => 
    apiClient.patch(`/books/${id}/stock?quantity_change=${quantityChange}`),
  
  // Authors
  getAuthors: (params = {}) => apiClient.get('/authors/', { params }),
  getAuthor: (id) => apiClient.get(`/authors/${id}`),
  createAuthor: (data) => apiClient.post('/authors/', data),
  updateAuthor: (id, data) => apiClient.put(`/authors/${id}`, data),
  deleteAuthor: (id) => apiClient.delete(`/authors/${id}`),
  
  // Categories
  getCategories: (params = {}) => apiClient.get('/categories/', { params }),
  getCategory: (id) => apiClient.get(`/categories/${id}`),
  createCategory: (data) => apiClient.post('/categories/', data),
  updateCategory: (id, data) => apiClient.put(`/categories/${id}`, data),
  deleteCategory: (id) => apiClient.delete(`/categories/${id}`),
  
  // Search
  searchBooks: (query) => apiClient.get(`/search/books/?q=${encodeURIComponent(query)}`),
  
  // Health check
  healthCheck: () => apiClient.get('/health'),
};

export default apiClient; 