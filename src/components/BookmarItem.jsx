import React from 'react'
import DeleteModal from './DeleteModal'

function BookmarItem({bookmark}) {
  return (
    <div className="bg-base-900 p-3 rounded-box flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{bookmark.title}</h3>
          <i className="ri-external-link-line"></i> {/* Class name corrected */}
        </div>
        <p className="text-xs text-base-content/70">{bookmark?.description}</p>
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500">
          {bookmark.url}
        </a>
      </div>

      <div className="flex items-end gap-1 text-xs">
        <button className="btn btn-xs">
          <i className="ri-file-copy-line"></i>
        </button>
        <button className="btn btn-xs">
          <i className="ri-pencil-line"></i> {/* Class name corrected */}
        </button>
        <button className="btn btn-xs" onClick={()=>document.getElementById('my_modal_5').showModal()}>
          <i className="ri-delete-bin-7-line"></i> {/* Class name corrected */}
        </button>
      </div>
      <DeleteModal/>
    </div>
  )
}

export default BookmarItem
