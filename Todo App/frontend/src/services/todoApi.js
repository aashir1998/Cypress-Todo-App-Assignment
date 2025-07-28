import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading state if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error("Unauthorized access");
    } else if (error.response?.status === 403) {
      // Handle forbidden
      console.error("Access forbidden");
    } else if (error.response?.status === 404) {
      // Handle not found
      console.error("Resource not found");
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  },
);

// API methods
export const todoApi = {
  // Get all todos with optional filters
  getTodos: async (params = {}) => {
    const response = await api.get("/todos", { params });
    return response.data.data;
  },

  // Get a specific todo by ID
  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data.data;
  },

  // Create a new todo
  createTodo: async (todoData) => {
    const response = await api.post("/todos", todoData);
    return response.data.data;
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data.data;
  },

  // Partially update a todo
  patchTodo: async (id, updates) => {
    const response = await api.patch(`/todos/${id}`, updates);
    return response.data.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data.data;
  },

  // Toggle all todos completion status
  toggleAllTodos: async (completed) => {
    const response = await api.put("/todos/toggle-all", {
      completed: completed,
    });
    return response.data.data;
  },

  // Clear all completed todos
  clearCompleted: async () => {
    const response = await api.delete("/todos");
    return response.data.data;
  },

  // Get todo statistics
  getStats: async () => {
    const response = await api.get("/stats");
    return response.data.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL?.replace("/api", "") ||
        "http://localhost:3001/health",
    );
    return response.data;
  },
};

// Export the api instance for direct use if needed
export default api;
