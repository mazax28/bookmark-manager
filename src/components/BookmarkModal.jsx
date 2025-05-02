import React from 'react';
function BookmarkModal() {
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const availableTags = ['javascript', 'react', 'css', 'html', 'mongodb'];


  const folders = [
    {
      id: 'folder-1',
      name: 'Desarrollo',
    },
    {
      id: 'folder-2',
      name: 'Diseño',
    },
    {
      id: 'folder-3',
      name: 'Productividad',
    }
  ];
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
            <select defaultValue="" className="select w-full" required>
                <option value="" disabled>
                  Elige una carpeta
                </option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
            <label className="label" htmlFor="tags">Tags</label>
{/* Selector de tags desde mockdata */}
<label className="label" htmlFor="tags">Tags</label>
<div className="flex flex-wrap gap-2">
  {availableTags.map((tag) => (
    <button
      key={tag}
      type="button"
      className={`badge cursor-pointer ${
        tags.includes(tag) ? 'badge-neutral' : 'badge-outline'
      }`}
      onClick={() => {
        if (tags.includes(tag)) {
          setTags(tags.filter((t) => t !== tag));
        } else {
          setTags([...tags, tag]);
        }
      }}
    >
      {tag}
    </button>
  ))}
</div>

{/* Mostrar tags seleccionados (opcional, si quieres separarlo) */}
{tags.length > 0 && (
  <div className="mt-2 text-sm text-gray-500">
    Tags seleccionados: {tags.join(', ')}
  </div>
)}


            
            
  
            <button type="submit" className="btn btn-neutral mt-4">Guardar bookmark</button>
          </form>
        </div>
      </dialog>
    );
  }
  
  export default BookmarkModal;
  