import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFolders } from '../api/folderApi'; // Asegúrate de que esta función esté definida en tu API
function BookmarkModal() {
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const availableTags = ['javascript', 'react', 'css', 'html', 'mongodb'];
  
  const { data, isPending, isError, error } = useQuery({
      queryKey: ['folders'],
      queryFn: getFolders,
    });

 
    return (
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {/* Botón de cierre */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById('my_modal_3').close()}
          >
            ✕
          </button>
  
          <form className="fieldset space-y-2">
            <legend className="fieldset-legend mb-4 text-lg font-bold">Crear un bookmark</legend>
  
            <label className="label" htmlFor="url">URL</label>
            <input id="url" type="url" className="input w-full" placeholder="https://ejemplo.com" required />
  
            <label className="label" htmlFor="title">Título</label>
            <input id="title" type="text" className="input w-full" placeholder="Título del bookmark" />
  
            <label className="label" htmlFor="description">Descripción</label>
            <input id="description" type="text" className="input w-full" placeholder="Descripción breve" />
  
            <label className="label" htmlFor="category">Carpeta</label>
            <select defaultValue="" className="select w-full" required disabled={isPending}>
                <option value="" disabled>
                  Elige una carpeta
                </option>
                {data?.folders?.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>

            {/* Selector de tags con dropdown y checkboxes */}
            <label className="label" htmlFor="tags">Tags</label>
            <div className="dropdown dropdown-bottom w-full">
              <label tabIndex={0} className="btn btn-outline w-full justify-between">
                <span>{tags.length > 0 ? `${tags.length} tags seleccionados` : 'Seleccionar tags'}</span>
                <i className="ri-arrow-down-s-line"></i>
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] bg-base-100 shadow rounded-box w-full max-h-40 overflow-y-auto p-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="form-control">
                    <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-base-200 rounded-md">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm" 
                        checked={tags.includes(tag)}
                        onChange={() => {
                          if (tags.includes(tag)) {
                            setTags(tags.filter((t) => t !== tag));
                          } else {
                            setTags([...tags, tag]);
                          }
                        }} 
                      />
                      <span>{tag}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Mostrar tags seleccionados */}
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 border border-base-300 rounded">
                {tags.map(tag => (
                  <div key={tag} className="badge badge-neutral gap-1 mb-1">
                    {tag}
                    <button 
                      type="button"
                      onClick={() => setTags(tags.filter(t => t !== tag))}
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
  
            <button type="submit" className="btn btn-neutral mt-4">Guardar bookmark</button>
          </form>
        </div>
      </dialog>
    );
  }
  
  export default BookmarkModal;
