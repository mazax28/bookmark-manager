import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFolder } from '../api/folderApi';
import toast from 'react-hot-toast';

function AddSubfolderModal({ parentFolderId, isOpen, onClose }) {
  const [folderData, setFolderData] = useState({
    name: '',
    color: ''
  });

  const queryClient = useQueryClient();

  const addSubfolderMutation = useMutation({
    mutationFn: addFolder,
    onSuccess: () => {
      toast.success('¡Subcarpeta creada correctamente!');
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['foldersHierarchy'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      resetForm();
      onClose();
    },
    onError: (error) => {
      toast.error(`Error al crear la subcarpeta: ${error.message}`);
    }
  });

  const resetForm = () => {
    setFolderData({
      name: '',
      color: ''
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFolderData({
      ...folderData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubfolderMutation.mutate({
      name: folderData.name,
      color: folderData.color,
      parentFolder: parentFolderId // Include the parent folder ID
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear subcarpeta</h2>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">Nombre de la subcarpeta</label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Ej: Trabajo, Tutoriales, Recursos"
              value={folderData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="color">Color (opcional)</label>
            <select 
              id="color" 
              className="select select-bordered w-full" 
              value={folderData.color} 
              onChange={handleChange}
            >
              <option value="">Seleccionar color</option>
              <option value="red">Rojo</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="yellow">Amarillo</option>
              <option value="gray">Gris</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={addSubfolderMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={addSubfolderMutation.isPending || !folderData.name}
            >
              {addSubfolderMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Crear subcarpeta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubfolderModal;