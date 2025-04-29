import {create} from "zustand";


export const useViewStore = create((set) => ({
    view: 'grid',
    setView: (view) => set({ view }),
}));