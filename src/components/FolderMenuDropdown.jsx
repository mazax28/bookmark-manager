import React from 'react'

function FolderMenuDropdown({folderId}) {
  return (
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">⋮</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>Editar</a></li>
    <li><a>Eliminar</a></li>
    <li><a>Agregar bookmark</a></li>

  </ul>
</div>
  )
}

export default FolderMenuDropdown
