import React from 'react'
import BookmarItem from './BookmarItem'

function BookmarkList({bookmarks}) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
      {/* BookmarkItem */}
      {
        bookmarks.map((bookmark) => (
          <BookmarItem key={bookmark.id} bookmark={bookmark} />
        ))
      }
      {/* Ejemplo de BookmarkItem estático */}
      

    </div>
  )
}

export default BookmarkList
