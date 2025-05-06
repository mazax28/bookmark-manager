import React, { useState } from 'react'
import DeleteFolderModal from './DeleteFolderModal'
import EditFolderModal from './EditFolderModal'

function FolderMenuDropdown({ folderId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsDeleteModalOpen(true);
  };

  const handleAddBookmarkClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    // Open bookmark modal and preselect this folder
    document.getElementById('my_modal_3').showModal();
    // Ideal: pass folder ID to BookmarkModal to preselect it
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">⋮</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={handleEditClick}>Editar</a></li>
          <li><a onClick={handleDeleteClick}>Eliminar</a></li>
          <li><a onClick={handleAddBookmarkClick}>Agregar bookmark</a></li>
        </ul>
      </div>
      
      {isDeleteModalOpen && (
        <DeleteFolderModal 
          folderId={folderId} 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)} 
        />
      )}
      
      {isEditModalOpen && (
        <EditFolderModal
          folderId={folderId}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}

export default FolderMenuDropdown;
