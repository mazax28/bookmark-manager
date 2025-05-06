import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getFolder, updateFolder } from '../api/folderApi';
import toast from 'react-hot-toast';

function EditFolderModal({ folderId, isOpen, onClose }) {
  const [folderData, setFolderData] = useState({
    name: '',
    color: ''
  });

  const queryClient = useQueryClient();

  // Fetch folder details
  const { data, isLoading } = useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => getFolder(folderId),
    enabled: isOpen && !!folderId,
  });

  // Update form when data is fetched
  useEffect(() => {
    if (data && data.folder) {
      setFolderData({
        name: data.folder.name || '',
        color: data.folder.color || ''
      });
    }
  }, [data]);

  const updateFolderMutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      toast.success('Carpeta actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['foldersHierarchy'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Error al actualizar la carpeta: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFolderMutation.mutate({
      name: folderData.name,
      color: folderData.color
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFolderData({
      ...folderData,
      [id]: value
    });
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar carpeta</h2>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">Nombre de la carpeta</label>
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
              disabled={updateFolderMutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateFolderMutation.isPending}
            >
              {updateFolderMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFolderModal;