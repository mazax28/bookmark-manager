import { create } from "zustand";

const useSearchStore = create((set, get) => {
  let debounceTimeoutSearch = null;
  let debounceTimeoutFolder = null;
  
  return {
    // Estados
    searchTerm: '',
    folderSearchTerm: '',
    currentPage: 1,
    
    // Acciones para búsqueda de bookmarks
    setSearchTerm: (term) => {
      set({ searchTerm: term });
      
      // Limpiar timeout anterior
      if (debounceTimeoutSearch) clearTimeout(debounceTimeoutSearch);
      
      // Resetear paginación al cambiar búsqueda
      set({ currentPage: 1 });
    },
    
    // Debounce para búsqueda
    setDebouncedSearchTerm: (term, callback) => {
      set({ searchTerm: term });
      
      // Limpiar timeout anterior
      if (debounceTimeoutSearch) clearTimeout(debounceTimeoutSearch);
      
      // Resetear paginación al cambiar búsqueda
      set({ currentPage: 1 });
      
      // Establecer nuevo timeout
      debounceTimeoutSearch = setTimeout(() => {
        if (callback) callback(term);
      }, 500); // 500ms de espera
    },
    
    // Acciones para búsqueda de folders
    setFolderSearchTerm: (term) => {
      set({ folderSearchTerm: term });
    },
    
    setDebouncedFolderSearchTerm: (term, callback) => {
      set({ folderSearchTerm: term });
      
      // Limpiar timeout anterior
      if (debounceTimeoutFolder) clearTimeout(debounceTimeoutFolder);
      
      // Establecer nuevo timeout
      debounceTimeoutFolder = setTimeout(() => {
        if (callback) callback(term);
      }, 500); // 500ms de espera
    },
    
    // Acciones para paginación
    setCurrentPage: (page) => set({ currentPage: page }),
    
    // Limpiar búsquedas
    clearSearch: () => {
      if (debounceTimeoutSearch) clearTimeout(debounceTimeoutSearch);
      set({ searchTerm: '', currentPage: 1 });
    },
    
    clearFolderSearch: () => {
      if (debounceTimeoutFolder) clearTimeout(debounceTimeoutFolder);
      set({ folderSearchTerm: '' });
    }
  };
});

export default useSearchStore;