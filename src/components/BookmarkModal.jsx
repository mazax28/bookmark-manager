function BookmarkModal() {
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
            <select defaultValue="Pick a color" className="select w-full">
                <option disabled={true}>Elige una carpeta</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
            </select>
            
  
            <button type="submit" className="btn btn-neutral mt-4">Guardar bookmark</button>
          </form>
        </div>
      </dialog>
    );
  }
  
  export default BookmarkModal;
  