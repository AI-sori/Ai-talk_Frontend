import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Netlify가 VITE_API_URL로 프록시함
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
