import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOCALHOST, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (role) {
      config.headers["role"] = role;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;