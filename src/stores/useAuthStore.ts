import { create } from "zustand";

interface User {
  userId: number;
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
