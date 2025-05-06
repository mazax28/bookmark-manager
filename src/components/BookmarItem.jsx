import React from 'react'
import DeleteModal from './DeleteModal'
import EditBookmarkModal from './EditBookmarkModal'
import MoveBookmarkModal from './MoveBookmarkModal'
import DeleteBookmarkModal from './DeleteBookmarkModal'
import { useState } from 'react'


function BookmarItem({bookmark}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const bookmarkId = bookmark._id;
  const handleEditClick = (e) => {
    // Close dropdown and open edit modal
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = (e) => {
    document.activeElement.blur(); // Forzar cierre del dropdown
    setIsDeleteModalOpen(true);
  }

  return (
    <>
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
          <button onClick={handleEditClick} className="btn btn-xs">
            <i className="ri-pencil-line"></i> {/* Class name corrected */}
          </button>
          <button className="btn btn-xs" onClick={handleDeleteClick}>
            <i className="ri-delete-bin-7-line"></i> {/* Class name corrected */}
          </button>
        </div>
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

      {isMoveModalOpen && (
        <MoveBookmarkModal
          bookmarkId={bookmarkId}
          isOpen={isMoveModalOpen}
          onClose={() => setIsMoveModalOpen(false)}
        />
      )}
    </>

    
  )
}

export default BookmarItem
