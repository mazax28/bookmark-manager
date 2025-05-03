import React from 'react'

function FolderItem({ folder }) {
  return (
    <div
      className="bg-base-900 p-3 rounded-box flex justify-between items-center cursor-pointer hover:bg-base-800"
    >
      <div className="flex items-center gap-2">
        <i className="ri-folder-line text-lg text-yellow-500" />
        <h3 className="font-semibold text-sm">{folder.name}</h3>
      </div>

      <div>
        <i className="ri-arrow-right-s-line text-xl text-base-content/70" />
      </div>
    </div>
  )
}

export default FolderItem
