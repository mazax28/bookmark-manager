import React from 'react'

function BookmarItem({bookmark}) {
  return (
    <div className="bg-base-900 p-3 rounded-box flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{bookmark.title}</h3>
          <i class="ri-external-link-line"></i> {/* Ajustamos el tamaño aquí */}
        </div>
        <p className="text-xs text-base-content/70">{bookmark.description}</p>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500">
          {bookmark.url}
        </a>
      </div>

      <div className="flex items-end gap-1 text-xs">
        <button className="btn btn-xs">
          <i className="ri-file-copy-line"></i>
        </button>
        <button className="btn btn-xs">
          <i className="ri-pencil-fill"></i>
        </button>
        <button className="btn btn-xs">
          <i className="ri-delete-bin-fill"></i>
        </button>
      </div>
    </div>
  )
}

export default BookmarItem
