import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFoldersHierarchy } from '../api/folderApi';
import { addBookmark } from '../api/bookmarkApi';
import { toast } from 'react-hot-toast';

function BookmarkModal() {
  const [bookmarkData, setBookmarkData] = useState({
    url: '',
    title: '',
    description: '',
    folder: '',
    tags: []
  });

  const [showFolderTree, setShowFolderTree] = useState(false);
  const folderTreeRef = useRef(null);
  const [tagInput, setTagInput] = useState('');
  const availableTags = ['javascript', 'react', 'css', 'html', 'mongodb'];
  const [selectedFolderName, setSelectedFolderName] = useState('');

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['foldersHierarchy'],
    queryFn: getFoldersHierarchy,
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      toast.success('¡Bookmark guardado correctamente!');
      document.getElementById('my_modal_3').close();
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
    },
    onError: (error) => {
      toast.error(`Error al guardar el bookmark: ${error.message}`);
    }
  });

  // Cerrar el árbol de carpetas cuando se hace clic fuera
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

  const resetForm = () => {
    setBookmarkData({
      url: '',
      title: '',
      description: '',
      folder: '',
      tags: []
    });
    setSelectedFolderName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting bookmark:', bookmarkData);
    mutate(bookmarkData);
  };

  // Componente recursivo para renderizar la estructura de árbol de carpetas
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
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById('my_modal_3').close()}
        >
          ✕
        </button>

        <form className="fieldset space-y-2" onSubmit={handleSubmit}>
          <legend className="fieldset-legend mb-4 text-lg font-bold">Crear un bookmark</legend>

          <label className="label" htmlFor="url">URL</label>
          <input
            id="url"
            type="url"
            className="input w-full"
            placeholder="https://ejemplo.com"
            required
            value={bookmarkData.url}
            onChange={handleChange}
          />

          <label className="label" htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            className="input w-full"
            placeholder="Título del bookmark"
            value={bookmarkData.title}
            onChange={handleChange}
          />

          <label className="label" htmlFor="description">Descripción</label>
          <input
            id="description"
            type="text"
            className="input w-full"
            placeholder="Descripción breve"
            value={bookmarkData.description}
            onChange={handleChange}
          />

          {/* Selector de carpeta personalizado tipo árbol */}
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
                {isPending ? (
                  <div className="p-4 text-center">
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : data && data.length > 0 ? (
                  data.map(folder => (
                    <FolderTreeItem key={folder._id} folder={folder} />
                  ))
                ) : (
                  <div className="p-2 text-center">No hay carpetas disponibles</div>
                )}
              </div>
            )}
          </div>

          <label className="label" htmlFor="tags">Tags</label>
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

          {bookmarkData.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 border border-base-300 rounded">
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

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={isSaving || !bookmarkData.folder}
          >
            {isSaving ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : 'Guardar bookmark'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default BookmarkModal;
