import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const sessionId = useAuthStore.getState().user?.sessionId;

  if (sessionId) {
    config.headers["sessionId"] = sessionId;
  }

  return config;
});

export default axiosInstance;
