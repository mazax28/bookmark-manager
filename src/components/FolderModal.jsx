import React from 'react';

function FolderModal() {
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

        <form className="fieldset space-y-4">
          <legend className="fieldset-legend mb-4 text-lg font-bold">Crear una carpeta</legend>

          <label className="label" htmlFor="folderName">Nombre de la carpeta</label>
          <input
            id="folderName"
            type="text"
            className="input w-full"
            placeholder="Ej: Trabajo, Tutoriales, Recursos"
            required
          />

          <label className="label" htmlFor="folderColor">Color (opcional)</label>
          <select id="folderColor" defaultValue="" className="select w-full">
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
