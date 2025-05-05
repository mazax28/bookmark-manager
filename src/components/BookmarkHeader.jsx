import React, { useCallback } from 'react';
import AddDropdown from "./AddDropdown";
import BookmarkFilter from "./BookmarkFilter";
import BookmarkModal from "./BookmarkModal";
import FolderModal from "./FolderModal";
import ViewSelector from "./ViewSelector";
import useSearchStore from "../store/useSearchStore";

function BookmarkHeader() {
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();
  
  // Usar useCallback para evitar recrear esta función en cada renderizado
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    // La invalidación de la consulta y el debounce se manejan en useSearchStore
  }, [setSearchTerm]);
  
  const handleClearSearch = useCallback(() => {
    clearSearch();
    // No es necesario invalidar manualmente
  }, [clearSearch]);
  
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
      <div className='flex items-center gap-4'>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar bookmarks..." 
            className="input pr-8" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleClearSearch}
              aria-label="Limpiar búsqueda"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
        <BookmarkModal />
        <FolderModal />
        <AddDropdown />
      </div>
      <div className="flex items-center gap-4">
        <BookmarkFilter />
        <ViewSelector />
      </div>
    </div>
  );
}

export default BookmarkHeader;
