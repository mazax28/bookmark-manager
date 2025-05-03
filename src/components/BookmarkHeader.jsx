import AddDropdown from "./AddDropdown"
import BookmarkFilter from "./BookmarkFilter"
import BookmarkModal from "./BookmarkModal"
import FolderModal from "./FolderModal"
import ViewSelector from "./ViewSelector"
import useSearchStore from "../store/useSearchStore"

function BookmarkHeader() {
  const { searchTerm, setSearchTerm } = useSearchStore();
  
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
        <div className='flex items-center gap-4'>
            <input 
              type="text" 
              placeholder="Buscar bookmarks..." 
              className="input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BookmarkModal />
            <FolderModal />
            <AddDropdown />
        </div>
        <div className="flex items-center gap-4">
          <BookmarkFilter />
          <ViewSelector />
        </div>
    </div>
  )
}

export default BookmarkHeader
