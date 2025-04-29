import {create} from "zustand";


const useFilterStore = create((set) => ({
    selectedFilter :'todos',
    setFilter: (filter) => set({ selectedFilter: filter }),
}));
export {useFilterStore}