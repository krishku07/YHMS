import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
});

// Automatically attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Uniform response/error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (token expired/invalid) -> auto logout
    if (error.response?.status === 401) {
      const isAuthPage = window.location.pathname === "/" ||
        window.location.pathname === "/forgot-password";
      if (!isAuthPage) {
        localStorage.clear();
        // Redirect to login if not already there
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
