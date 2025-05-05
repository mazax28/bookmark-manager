import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmark, moveBookmark } from '../api/bookmarkApi';
import { getFoldersHierarchy } from '../api/folderApi';
import toast from 'react-hot-toast';

function MoveBookmarkModal({ bookmarkId, isOpen, onClose }) {
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [currentFolderName, setCurrentFolderName] = useState('');
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const [showFolderTree, setShowFolderTree] = useState(false);
  const folderTreeRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch the specific bookmark data
  const { data, isLoading } = useQuery({
    queryKey: ['bookmark', bookmarkId],
    queryFn: () => getBookmark(bookmarkId),
    enabled: isOpen && !!bookmarkId,
  });

  // Get folders hierarchy for the folder selector
  const { data: folders, isPending: foldersLoading } = useQuery({
    queryKey: ['foldersHierarchy'],
    queryFn: getFoldersHierarchy,
  });

  // Find folder name by ID (recursive function)
  const findFolderName = (folders, id) => {
    if (!folders) return null;
    
    for (const folder of folders) {
      if (folder._id === id) return folder;
      
      const found = findFolderName(folder.subfolders, id);
      if (found) return found;
    }
    return null;
  };

  // Set current folder name when data is loaded
  useEffect(() => {
    if (data?.bookmark && folders) {
      const folderObj = findFolderName(folders, data.bookmark.folder);
      if (folderObj) {
        setCurrentFolderName(folderObj.name);
      }
    }
  }, [data, folders]);

  // Move bookmark mutation
  const moveBookmarkMutation = useMutation({
    mutationFn: moveBookmark,
    onSuccess: () => {
      toast.success('Bookmark movido con éxito');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error moviendo bookmark:', error);
      toast.error('Error al mover el bookmark');
    }
  });

  // Close folder tree when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (folderTreeRef.current && !folderTreeRef.current.contains(event.target)) {
        setShowFolderTree(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [folderTreeRef]);

  const handleFolderSelect = (folderId, folderName) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    setShowFolderTree(false);
  };

  const handleMoveBookmark = () => {
    if (!selectedFolderId) {
      toast.error('Por favor selecciona una carpeta');
      return;
    }

    if (data?.bookmark?.folder === selectedFolderId) {
      toast.error('El bookmark ya está en esta carpeta');
      return;
    }

    moveBookmarkMutation.mutate({
      id: bookmarkId,
      folderId: selectedFolderId
    });
  };

  if (!isOpen) return null;

  // Display loading state while fetching
  if (isLoading || foldersLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  // Recursive component for folder tree
  const FolderTreeItem = ({ folder, depth = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0;
    const isCurrent = data?.bookmark?.folder === folder._id;
    
    return (
      <div className="pl-2">
        <div 
          className={`flex items-center p-1 rounded-md hover:bg-base-300 cursor-pointer 
            ${selectedFolderId === folder._id ? 'bg-base-300' : ''} 
            ${isCurrent ? 'text-primary' : ''}`}
          onClick={() => handleFolderSelect(folder._id, folder.name)}
        >
          <div style={{ paddingLeft: `${depth * 12}px` }} className="flex items-center">
            {hasSubfolders && (
              <button 
                type="button"
                className="mr-1 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                <i className={`ri-${expanded ? 'arrow-down-s-line' : 'arrow-right-s-line'}`}></i>
              </button>
            )}
            <i className="ri-folder-fill text-yellow-500 mr-2"></i>
            <span>{folder.name} {isCurrent && '(actual)'}</span>
          </div>
        </div>
        
        {expanded && hasSubfolders && (
          <div className="ml-4">
            {folder.subfolders.map((subfolder) => (
              <FolderTreeItem 
                key={subfolder._id} 
                folder={subfolder} 
                depth={depth + 1} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mover bookmark</h2>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Current folder information */}
          <div className="bg-base-200 p-3 rounded-lg">
            <div className="text-sm text-base-content/70">Carpeta actual:</div>
            <div className="flex items-center gap-2 font-medium">
              <i className="ri-folder-fill text-yellow-500"></i>
              {currentFolderName || 'Sin carpeta'}
            </div>
          </div>

          {/* Selector de carpeta destino */}
          <div>
            <label className="label">
              <span className="flex items-center gap-1">
                <i className="ri-folders-fill"></i> Mover a carpeta:
              </span>
            </label>
            <div className="relative">
              <button
                type="button"
                className="btn btn-outline w-full text-left justify-start"
                onClick={() => setShowFolderTree(!showFolderTree)}
              >
                {selectedFolderName ? (
                  <div className="flex items-center gap-2">
                    <i className="ri-folder-fill text-yellow-500"></i>
                    {selectedFolderName}
                  </div>
                ) : (
                  "Seleccionar carpeta destino"
                )}
                <i className="ri-arrow-down-s-line ml-auto"></i>
              </button>
              
              {showFolderTree && (
                <div 
                  ref={folderTreeRef}
                  className="absolute z-10 top-full left-0 w-full bg-base-100 border border-base-300 rounded-box shadow-lg mt-1 p-2 max-h-60 overflow-y-auto"
                >
                  {folders && folders.length > 0 ? (
                    folders.map(folder => (
                      <FolderTreeItem key={folder._id} folder={folder} />
                    ))
                  ) : (
                    <div className="p-2 text-center">No hay carpetas disponibles</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={moveBookmarkMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMoveBookmark}
              disabled={moveBookmarkMutation.isPending || !selectedFolderId}
            >
              {moveBookmarkMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Mover bookmark'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoveBookmarkModal;