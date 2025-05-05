import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBookmark } from '../api/bookmarkApi'
import toast from 'react-hot-toast'

function DeleteBookmarkModal({ bookmarkId, isOpen, onClose }) {
  const queryClient = useQueryClient();
  
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      // Invalidate and refetch bookmarks list after deletion
      toast.success('Bookmark eliminado con éxito');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error deleting bookmark:', error);
      // You could add error handling UI here
    }
  });

  const handleConfirmDelete = () => {
    deleteBookmarkMutation.mutate({ id: bookmarkId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar este bookmark? Esta acción no se puede deshacer.</p>
        
        <div className="flex justify-end gap-2">
          <button 
            className="btn btn-outline" 
            onClick={onClose} 
            disabled={deleteBookmarkMutation.isPending}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-error" 
            onClick={handleConfirmDelete}
            disabled={deleteBookmarkMutation.isPending}
          >
            {deleteBookmarkMutation.isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBookmarkModal