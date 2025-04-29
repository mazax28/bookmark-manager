import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isCheckingAuth: true,
  login: (user) => set({ user, isAuthenticated: true, error: null,isCheckingAuth:false}),
  register: (user) => set({ user, error: null }),
  verifyUser: (user) => set({user, isChekingAuth:false,isAuthenticated:true }),
  setError: (error) => set({ error, isAuthenticated: false }),
  logout: () => set({ user: null, isAuthenticated: false, error: null }),

}))

export { useAuthStore }