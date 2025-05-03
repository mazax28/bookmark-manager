import React from 'react'
import BookmarItem from './BookmarItem'
import FolderItem from './FolderItem'

function BookmarkList({bookmarks, subfolders, onFolderClick}) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
      {/* BookmarkItem */}
      {subfolders && subfolders.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-base-content/70"><i className="ri-folder-line"></i></span>
            <p className="text-sm text-base-content/70">Subcarpetas</p>
          </div>
          {
            subfolders.map((sub) => (
              <FolderItem key={sub._id} folder={sub} onFolderClick={onFolderClick} />
            ))
          }
          <div className="divider"></div>
        </>
      )}
      
      {bookmarks && bookmarks.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-base-content/70"><i className="ri-bookmark-line"></i></span>
            <p className="text-sm text-base-content/70">Bookmarks</p>
          </div>
          {
            bookmarks.map((bookmark) => (
              <BookmarItem key={bookmark._id} bookmark={bookmark} />
            ))
          }
        </>
      )}
    </div>
  )
}

export default BookmarkList
