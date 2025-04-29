import React from 'react'

function AddDropdown() {
  return (
    <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="btn m-1">Agregar</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a  onClick={()=>document.getElementById('folder_modal').showModal()}>Carpeta</a></li>
            <li><a onClick={()=>document.getElementById('my_modal_3').showModal()}>Bookmark</a></li>
        </ul>
    </div>
  )
}

export default AddDropdown
