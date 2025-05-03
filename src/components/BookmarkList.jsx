import React from 'react'
import BookmarItem from './BookmarItem'
import FolderItem from './FolderItem'

function BookmarkList({bookmarks, subfolders}) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
      {/* BookmarkItem */}
                <div className="flex items-center gap-2">
                  <span className="text-base-content/70"><i class="ri-folder-line"></i></span>
                  <p className="text-sm text-base-content/70">Subcarpetas</p>
      </div>
      {
        
          subfolders.map((sub) => (
              <FolderItem key={sub._id} folder={sub} />
            ))
        
      }
    <div className="divider"></div>
                <div className="flex items-center gap-2">
                  <span className="text-base-content/70"><i class="ri-bookmark-line"></i></span>
                  <p className="text-sm text-base-content/70">Bookmarks</p>
                </div>
      {
        bookmarks.map((bookmark) => (
          <BookmarItem key={bookmark._id} bookmark={bookmark} />
        ))
      }
      {/* Ejemplo de BookmarkItem estático */}
      

    </div>
  )
}

export default BookmarkList
