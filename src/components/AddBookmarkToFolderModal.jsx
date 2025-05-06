import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '../api/bookmarkApi';
import toast from 'react-hot-toast';

function AddBookmarkToFolderModal({ folderId, isOpen, onClose }) {
  const [bookmarkData, setBookmarkData] = useState({
    url: '',
    title: '',
    description: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const availableTags = ['javascript', 'react', 'css', 'html', 'mongodb', 'node', 'backend'];
  
  const queryClient = useQueryClient();

  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      toast.success('Bookmark añadido con éxito');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      resetForm();
      onClose();
    },
    onError: (error) => {
      toast.error(`Error al añadir el bookmark: ${error.message}`);
    }
  });

  const resetForm = () => {
    setBookmarkData({
      url: '',
      title: '',
      description: '',
      tags: []
    });
    setTagInput('');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookmarkData({
      ...bookmarkData,
      [id]: value
    });
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
    
    // Add the folder ID to the bookmark data
    addBookmarkMutation.mutate({
      ...bookmarkData,
      folder: folderId
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Añadir bookmark a esta carpeta</h2>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              className="input input-bordered w-full"
              placeholder="https://ejemplo.com"
              value={bookmarkData.url}
              onChange={handleChange}
              required
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
              disabled={addBookmarkMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={addBookmarkMutation.isPending || !bookmarkData.url}
            >
              {addBookmarkMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Añadir bookmark'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookmarkToFolderModal;