import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBookmark, getBookmarkById } from '../api/bookmarkApi';
import { getFoldersHierarchy } from '../api/folderApi';
import toast from 'react-hot-toast';

function EditBookmarkModal({ bookmarkId, isOpen, onClose }) {
  const [bookmarkData, setBookmarkData] = useState({
    id: bookmarkId,
    url: '',
    title: '',
    description: '',
    folder: '',
    tags: []
  });

  const [showFolderTree, setShowFolderTree] = useState(false);
  const folderTreeRef = useRef(null);
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const availableTags = ['javascript', 'react', 'css', 'html', 'mongodb'];
  
  const queryClient = useQueryClient();

  // Fetch the specific bookmark data
  const { data: bookmarkDetails, isLoading } = useQuery({
    queryKey: ['bookmark', bookmarkId],
    queryFn: () => getBookmarkById(bookmarkId),
    enabled: isOpen && !!bookmarkId, // Only fetch when modal is open and ID exists
  });

  // Update form data when bookmark details are fetched
  useEffect(() => {
    if (bookmarkDetails) {
      const bookmark = bookmarkDetails.data;
      setBookmarkData({
        id: bookmarkId,
        url: bookmark.url || '',
        title: bookmark.title || '',
        description: bookmark.description || '',
        folder: bookmark.folder || '',
        tags: bookmark.tags || []
      });
      
      // Set selected folder name if available
      if (bookmark.folderName) {
        setSelectedFolderName(bookmark.folderName);
      }
    }
  }, [bookmarkDetails, bookmarkId]);

  // Get folders hierarchy for the folder selector
  const { data: folders, isPending: foldersLoading } = useQuery({
    queryKey: ['foldersHierarchy'],
    queryFn: getFoldersHierarchy,
  });

  // Update bookmark mutation
  const updateBookmarkMutation = useMutation({
    mutationFn: updateBookmark,
    onSuccess: () => {
      toast.success('Bookmark actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error updating bookmark:', error);
      toast.error('Error al actualizar el bookmark');
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookmarkData({
      ...bookmarkData,
      [id]: value
    });
  };

  const handleFolderSelect = (folderId, folderName) => {
    setBookmarkData({
      ...bookmarkData,
      folder: folderId
    });
    setSelectedFolderName(folderName);
    setShowFolderTree(false);
  };

  const handleTagToggle = (tag) => {
    const updatedTags = bookmarkData.tags.includes(tag)
      ? bookmarkData.tags.filter(t => t !== tag)
      : [...bookmarkData.tags, tag];

    setBookmarkData({
      ...bookmarkData,
      tags: updatedTags
    });
  };

  const removeTag = (tagToRemove) => {
    setBookmarkData({
      ...bookmarkData,
      tags: bookmarkData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookmarkMutation.mutate(bookmarkData);
  };

  if (!isOpen) return null;

  // Recursive component for folder tree
  const FolderTreeItem = ({ folder, depth = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0;
    
    return (
      <div className="pl-2">
        <div 
          className={`flex items-center p-1 rounded-md hover:bg-base-300 cursor-pointer ${bookmarkData.folder === folder._id ? 'bg-base-300' : ''}`}
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
            <span>{folder.name}</span>
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
          <h2 className="text-xl font-bold">Editar bookmark</h2>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              className="input input-bordered w-full"
              placeholder="https://ejemplo.com"
              required
              value={bookmarkData.url}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              className="input input-bordered w-full"
              placeholder="Título del bookmark"
              value={bookmarkData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="description">Descripción</label>
            <input
              id="description"
              type="text"
              className="input input-bordered w-full"
              placeholder="Descripción breve"
              value={bookmarkData.description}
              onChange={handleChange}
            />
          </div>

          {/* Selector de carpeta */}
          <div>
            <label className="label">
              <span className="flex items-center gap-1">
                <i className="ri-folder-fill"></i> Carpeta
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
                  "Seleccionar carpeta"
                )}
                <i className="ri-arrow-down-s-line ml-auto"></i>
              </button>
              
              {showFolderTree && (
                <div 
                  ref={folderTreeRef}
                  className="absolute z-10 top-full left-0 w-full bg-base-100 border border-base-300 rounded-box shadow-lg mt-1 p-2 max-h-60 overflow-y-auto"
                >
                  {foldersLoading ? (
                    <div className="p-4 text-center">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : folders && folders.length > 0 ? (
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

          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <div className="dropdown dropdown-bottom w-full">
              <label tabIndex={0} className="btn btn-outline w-full justify-between">
                <span>
                  {bookmarkData.tags.length > 0
                    ? `${bookmarkData.tags.length} tags seleccionados`
                    : 'Seleccionar tags'}
                </span>
                <i className="ri-arrow-down-s-line"></i>
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] bg-base-100 shadow rounded-box w-full max-h-40 overflow-y-auto p-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="form-control">
                    <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-base-200 rounded-md">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={bookmarkData.tags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                      />
                      <span>{tag}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected tags display */}
          {bookmarkData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 border border-base-300 rounded">
              {bookmarkData.tags.map(tag => (
                <div key={tag} className="badge badge-neutral gap-1 mb-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={updateBookmarkMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateBookmarkMutation.isPending || !bookmarkData.folder}
            >
              {updateBookmarkMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookmarkModal;