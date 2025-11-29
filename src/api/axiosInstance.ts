import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

//세션 아이디 관련 추가
axiosInstance.interceptors.request.use((config) => {
  const { user } = useAuthStore.getState();

  if (user?.sessionId) {
    config.headers["sessionId"] = user.sessionId;   
  }

  return config;
});

export default axiosInstance;
