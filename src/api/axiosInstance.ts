import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://port-0-ai-talk-backend-m95cwvb00db2ddb5.sel4.cloudtype.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}); 

export default axiosInstance;
