import React from 'react'
import BookmarkMenuDropdown from './BookmarkMenuDropdown'
import { useMutation } from '@tanstack/react-query'
import { updateFavorite } from '../api/bookmarkApi'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useSelectionStore from '../store/useSelectionStore'

function BookmarkCard({ bookmark }) {
  const queryClient = useQueryClient()
  const { isEditMode, toggleSelection, isSelected } = useSelectionStore();
  const selected = isSelected(bookmark._id);

  const {mutate} = useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      toast.success('Bookmark marcado como favorito')
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
    onError: (error) => {
      toast.error('Error al marcar el bookmark como favorito')
    }
  })

  const handleFavoriteClick = () => {
    mutate({
      id: bookmark._id,
    })
  }

  return (
    <div className={`card bg-base-200 w-96 shadow-sm border ${selected ? 'border-primary bg-base-300' : 'border-base-200'}`}>
      <div className="card-body space-y-2">
        {/* Header del bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            {isEditMode ? (
              <div className="form-control">
                <input 
                  type="checkbox" 
                  checked={selected}
                  onChange={() => toggleSelection(bookmark._id)} 
                  className="checkbox checkbox-primary" 
                />
              </div>
            ) : (
              <button 
                onClick={handleFavoriteClick} 
                className={bookmark.isFavorite ? 'text-yellow-400 btn border-none' : 'text-base-content btn border-none'}
              >
                <i className="ri-bookmark-fill"></i>
              </button>
            )}

            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {bookmark.title || bookmark.url}
            </a>
          </div>
          {!isEditMode && <BookmarkMenuDropdown bookmarkId={bookmark._id} />}
        </div>

        <div className="rounded-lg overflow-hidden">
            <img
              src="https://www.notion.so/images/logo-ios.png"
              alt={bookmark.title}
              className="w-full h-40 object-cover"
            />
        </div>
        
        {bookmark.description && (
          <p className="text-sm text-base-content/80">{bookmark.description}</p>
        )}

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
