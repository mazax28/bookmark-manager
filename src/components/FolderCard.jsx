import React, { useState } from 'react'
import BookmarkList from './BookmarkList'
import FolderMenuDropdown from './FolderMenuDropdown'

function FolderCard({ folder }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)
  console.log(folder)

  return (
    <div className="card bg-base-200 w-full h-[400px] shadow-sm border border-base-200">
      <div className="card-body space-y-2">
        {/* Header de la carpeta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-base-content/70"><i class="ri-folder-line"></i></span>
            {folder.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-neutral text-xs">{folder.bookmarkCount}</span>
            <FolderMenuDropdown />
            {/* Botón toggle solo en móviles */}
            <button
              className="md:hidden text-xl text-base-content"
              onClick={toggleOpen}
              aria-label="Toggle bookmarks"
            >
              <i className={isOpen ? 'ri-skip-up-line' : 'ri-skip-down-line'}></i>
            </button>
          </div>
        </div>

        {/* Lista de bookmarks */}
        <div className={`transition-all duration-300 ${isOpen ? '' : 'hidden'} md:block`}>
          {
            folder.bookmarkCount === 0 ? (
              <div className="text-center text-base-content/70">
                <p>No hay bookmarks en esta carpeta.</p>
              </div>
            ) : (
                <BookmarkList bookmarks={folder.bookmarks} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FolderCard
