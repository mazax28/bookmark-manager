import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addFolder } from '../api/folderApi';
import { useMutation,useQueryClient } from '@tanstack/react-query';

function FolderModal() {

  const [newFolder, setNewFolder] = useState({
    folderName: '',
    folderColor: ''
  });
  const queryClient = useQueryClient();


  const {mutate, isPending} = useMutation({
    mutationFn: addFolder,
    onSuccess: () => {
      toast.success('¡Carpeta creada correctamente!');
      document.getElementById('folder_modal').close();
      setNewFolder({
        folderName: '',
        folderColor: ''
      });
      queryClient.invalidateQueries({ queryKey: ['foldersHierarchy'] });
    },
    onError: (error) => {
      toast.error(`Error al crear la carpeta: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name: newFolder.folderName,
      color: newFolder.folderColor,
      folderParent: null // No parent folder for top-level folders
    });
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewFolder({
      ...newFolder,
      [id]: value
    });
  }
  return (
    <dialog id="folder_modal" className="modal">
      <div className="modal-box">
        {/* Botón de cierre */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById('folder_modal').close()}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="fieldset space-y-4">
          <legend className="fieldset-legend mb-4 text-lg font-bold">Crear una carpeta</legend>

          <label className="label" htmlFor="folderName">Nombre de la carpeta</label>
          <input
            id="folderName"
            type="text"
            onChange={handleChange}
            value={newFolder.folderName}
            className="input w-full"
            placeholder="Ej: Trabajo, Tutoriales, Recursos"
            required
          />

          <label className="label" htmlFor="folderColor">Color (opcional)</label>
          <select value={newFolder.folderColor} onChange={handleChange} id="folderColor" defaultValue="" className="select w-full">
            <option disabled value="">Elige un color</option>
            <option value="red">Rojo</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="yellow">Amarillo</option>
            <option value="gray">Gris</option>
          </select>

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Crear carpeta
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default FolderModal;
