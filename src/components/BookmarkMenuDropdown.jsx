import React, { useState } from 'react'
import DeleteBookmarkModal from './DeleteBookmarkModal'
import EditBookmarkModal from './EditBookmarkModal'

function BookmarkMenuDropdown({ bookmarkId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (e) => {
    // Close dropdown and open edit modal
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">⋮</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
            <a onClick={handleEditClick}>
              Editar
            </a>
          </li>
          <li>
            <a onClick={() => {
              document.activeElement.blur(); // Forzar cierre del dropdown
              setIsDeleteModalOpen(true);
            }}>
              Eliminar
            </a>
          </li>
          <li><a>Mover a</a></li>
        </ul>
      </div>
      
      {isDeleteModalOpen && (
        <DeleteBookmarkModal 
          bookmarkId={bookmarkId} 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)} 
        />
      )}
      
      {isEditModalOpen && (
        <EditBookmarkModal
          bookmarkId={bookmarkId}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  )
}

export default BookmarkMenuDropdown
