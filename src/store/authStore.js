import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  login: (user) => set({ user, isAuthenticated: true, error: null}),
  register: (user) => set({ user, error: null,isAuthenticated:true }),
  verifyUser: (user) => set({user}),
  setError: (error) => set({ error, isAuthenticated: false }),
  logout: () => set({ user: null, isAuthenticated: false, error: null }),

}))

export { useAuthStore }