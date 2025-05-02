import React from 'react'
import { bookmarkmockData } from '../mock/mockData'
import BookmarkCard from './BookmarkCard'
import BookmarkTable from './BookmarkTable'
import { useViewStore } from '../store/viewStore'

function BookmarkContainer() {
  const { view } = useViewStore()

  return (
    view === 'grid' ? (
      <div className="grid-fluid bg-base-100 p-4 rounded-box">
        {bookmarkmockData.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>
    ) : (
      <div>
        <BookmarkTable bookmarks={bookmarkmockData} />
      </div>
    )
  )
}

export default BookmarkContainer
