import React, { useState } from 'react'
import DeleteFolderModal from './DeleteFolderModal'
import EditFolderModal from './EditFolderModal'
import AddSubfolderModal from './AddSubfolderModal'
import AddBookmarkToFolderModal from './AddBookmarkToFolderModal'

function FolderMenuDropdown({ folderId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSubfolderModalOpen, setIsAddSubfolderModalOpen] = useState(false);
  const [isAddBookmarkModalOpen, setIsAddBookmarkModalOpen] = useState(false);

  const handleEditClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsDeleteModalOpen(true);
  };
  
  const handleAddSubfolderClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsAddSubfolderModalOpen(true);
  };

  const handleAddBookmarkClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsAddBookmarkModalOpen(true);
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">⋮</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={handleEditClick}>Editar</a></li>
          <li><a onClick={handleDeleteClick}>Eliminar</a></li>
          <li><a onClick={handleAddSubfolderClick}>Agregar subcarpeta</a></li>
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
      
      {isAddSubfolderModalOpen && (
        <AddSubfolderModal
          parentFolderId={folderId}
          isOpen={isAddSubfolderModalOpen}
          onClose={() => setIsAddSubfolderModalOpen(false)}
        />
      )}
      
      {isAddBookmarkModalOpen && (
        <AddBookmarkToFolderModal
          folderId={folderId}
          isOpen={isAddBookmarkModalOpen}
          onClose={() => setIsAddBookmarkModalOpen(false)}
        />
      )}
    </>
  );
}

export default FolderMenuDropdown;
