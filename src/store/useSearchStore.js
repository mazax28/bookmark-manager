import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: '',
  folderSearchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFolderSearchTerm: (term) => set({ folderSearchTerm: term }),
  clearSearch: () => set({ searchTerm: '', folderSearchTerm: '' }),
  clearFolderSearch: () => set({ folderSearchTerm: '' }),
}));

export default useSearchStore;