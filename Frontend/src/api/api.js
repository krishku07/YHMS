import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8081/api",
});

// =====================================================
// ATTACH JWT
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "TOKEN ATTACHED:",
      !!token
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE HANDLER
// =====================================================

api.interceptors.response.use(
  (response) => {
    console.log(
      "API SUCCESS:",
      response.status,
      response.config.url
    );

    return response;
  },

  (error) => {
    console.error(
      "API ERROR:",
      error.response?.status,
      error.config?.url
    );

    // IMPORTANT:
    // Do NOT clear sessionStorage here.
    //
    // We need to know which student API is returning 401.
    //
    if (error.response?.status === 401) {
      console.error(
        "401 UNAUTHORIZED:",
        error.config?.url
      );

      console.log(
        "CURRENT TOKEN EXISTS:",
        !!sessionStorage.getItem("token")
      );

      console.log(
        "CURRENT ROLE:",
        sessionStorage.getItem("role")
      );
    }

    return Promise.reject(error);
  }
);

export default api;