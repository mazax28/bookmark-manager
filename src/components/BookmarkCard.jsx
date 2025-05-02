import React from 'react'
import BookmarkMenuDropdown from './BookmarkMenuDropdown'
function BookmarkCard({ bookmark }) {
  return (
    <div className="card bg-base-200 w-96 shadow-sm border border-base-200">
      <div className="card-body space-y-2">
        {/* Header del bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-base-content/70">
              <i className="ri-bookmark-line"></i>
            </span>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {bookmark.title || bookmark.url}
            </a>
          </div>
          <BookmarkMenuDropdown/>
        </div>

        {/* Imagen de vista previa */}
        {bookmark.metadata?.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={bookmark.metadata.image}
              alt={bookmark.title}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Descripción */}
        {bookmark.description && (
          <p className="text-sm text-base-content/80">{bookmark.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {bookmark.tags?.map((tag, index) => (
            <div key={index} className="badge badge-outline text-xs">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
