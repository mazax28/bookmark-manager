import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  // Computar isAuthenticated basado en la existencia del usuario
  isAuthenticated: () => !!get().user,
  // Computar isVerified basado en el campo isverified del usuario
  // isVerified: () => get().user?.isverified || false,
  login: (user) => set({ user, error: null }),
  register: (user) => set({ user, error: null }),
  // verifyUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, error: null }),
}));

export { useAuthStore };