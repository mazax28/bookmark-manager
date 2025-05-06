import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFolder } from '../api/folderApi';
import toast from 'react-hot-toast';

function DeleteFolderModal({ folderId, isOpen, onClose }) {
  const queryClient = useQueryClient();
  
  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      toast.success('Carpeta eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['foldersHierarchy'] });
      queryClient.invalidateQueries({ queryKey: ['foldersWithBookmarks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error deleting folder:', error);
      toast.error('Error al eliminar la carpeta');
    }
  });

  const handleConfirmDelete = () => {
    deleteFolderMutation.mutate({ id: folderId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar esta carpeta? Esta acción eliminará también todos los bookmarks contenidos en ella.</p>
        
        <div className="flex justify-end gap-2">
          <button 
            className="btn btn-outline" 
            onClick={onClose} 
            disabled={deleteFolderMutation.isPending}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-error" 
            onClick={handleConfirmDelete}
            disabled={deleteFolderMutation.isPending}
          >
            {deleteFolderMutation.isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFolderModal;