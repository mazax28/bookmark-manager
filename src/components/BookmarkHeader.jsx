import React, { useCallback } from 'react';
import AddDropdown from "./AddDropdown";
import BookmarkFilter from "./BookmarkFilter";
import BookmarkModal from "./BookmarkModal";
import FolderModal from "./FolderModal";
import ViewSelector from "./ViewSelector";
import useSearchStore from "../store/useSearchStore";

function BookmarkHeader() {
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();
  
  // Handle search
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);
  
  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);
  
  return (
    <div className='flex flex-col gap-3 bg-base-200 px-4 py-2 rounded-box md:flex-row'>
       <div className='flex flex-col md:flex-row md:items-center md:justify-between w-full'>
        <div className='flex items-center gap-2 w-full md:w-auto'>
          <div className='relative flex-1'>
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
          <AddDropdown />
          <BookmarkModal />
          <FolderModal />
        </div>
      </div>
      
      <div className="flex justify-between items-center gap-2 w-full md:justify-end">
        <BookmarkFilter />
        <ViewSelector />
      </div>
    </div>
  );
}

export default BookmarkHeader;
