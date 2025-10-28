import axiosInstance from "./axiosInstance";
import type { Program } from "../types/program";

export const programApi = {
  getAll: async (): Promise<Program[]> => {
    const res = await axiosInstance.get("/program");
    return res.data;
  },
};
