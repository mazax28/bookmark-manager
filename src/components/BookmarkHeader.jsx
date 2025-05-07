import React, { useCallback } from 'react';
import AddDropdown from "./AddDropdown";
import BookmarkFilter from "./BookmarkFilter";
import BookmarkModal from "./BookmarkModal";
import FolderModal from "./FolderModal";
import ViewSelector from "./ViewSelector";
import useSearchStore from "../store/useSearchStore";
import useSelectionStore from "../store/useSelectionStore";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMultipleBookmarks } from '../api/bookmarkApi';
import toast from 'react-hot-toast';

function BookmarkHeader() {
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();
  const { isEditMode, toggleEditMode, selectedIds, clearSelection, getSelectedCount } = useSelectionStore();
  
  const queryClient = useQueryClient();
  
  // Bulk delete mutation
  const { mutate: deleteBookmarks, isPending } = useMutation({
    mutationFn: deleteMultipleBookmarks,
    onSuccess: () => {
      toast.success(`${getSelectedCount()} bookmarks eliminados`);
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      clearSelection();
      toggleEditMode(); // Exit edit mode after deletion
    },
    onError: () => {
      toast.error('Error al eliminar bookmarks');
    }
  });
  
  // Handle search
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);
  
  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);
  
  // Handle bulk deletion
  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) {
      if (window.confirm(`¿Estás seguro de eliminar ${getSelectedCount()} bookmarks?`)) {
        deleteBookmarks({ ids: selectedIds });
      }
    }
  };
  
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
      <div className='flex items-center gap-4'>
        {!isEditMode ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {getSelectedCount()} bookmarks seleccionados
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {isEditMode ? (
          <div className="flex items-center gap-2">
            <button 
              className="btn btn-error btn-sm"
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0 || isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                'Eliminar seleccionados'
              )}
            </button>
            <button 
              className="btn btn-outline btn-sm"
              onClick={toggleEditMode}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={toggleEditMode}
              className="btn btn-sm"
            >
              Selección múltiple
            </button>
            <BookmarkFilter />
            <ViewSelector />
          </>
        )}
      </div>
    </div>
  );
}

export default BookmarkHeader;
