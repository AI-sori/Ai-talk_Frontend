import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://port-0-ai-talk-backend-m95cvwb00db2ddb5.sel4.cloudtype.app",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}); 

export default axiosInstance;
