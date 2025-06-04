import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", 
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